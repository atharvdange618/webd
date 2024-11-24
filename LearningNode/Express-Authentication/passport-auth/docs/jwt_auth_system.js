//JWT Authentication System

// auth/jwt.service.js
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

class JWTService {
    constructor() {
        this.accessTokenSecret = process.env.JWT_ACCESS_SECRET;
        this.refreshTokenSecret = process.env.JWT_REFRESH_SECRET;
        this.accessTokenExpiry = process.env.JWT_ACCESS_EXPIRY || '15m';
        this.refreshTokenExpiry = process.env.JWT_REFRESH_EXPIRY || '7d';
        this.refreshTokens = new Map(); // In production, use Redis instead
    }

    generateAccessToken(user) {
        return jwt.sign(
            {
                userId: user._id,
                email: user.email,
                role: user.role
            },
            this.accessTokenSecret,
            {
                expiresIn: this.accessTokenExpiry,
                issuer: 'your-app-name',
                audience: 'your-app-users',
                subject: user._id.toString()
            }
        );
    }

    generateRefreshToken(user) {
        const refreshToken = jwt.sign(
            {
                userId: user._id,
                version: user.tokenVersion // For token invalidation
            },
            this.refreshTokenSecret,
            {
                expiresIn: this.refreshTokenExpiry,
                issuer: 'your-app-name',
                audience: 'your-app-users',
                subject: user._id.toString()
            }
        );

        // Store refresh token hash
        const refreshTokenHash = this.hashToken(refreshToken);
        this.refreshTokens.set(user._id.toString(), refreshTokenHash);

        return refreshToken;
    }

    verifyAccessToken(token) {
        try {
            const decoded = jwt.verify(token, this.accessTokenSecret);
            return { valid: true, decoded };
        } catch (error) {
            return { valid: false, error: error.message };
        }
    }

    verifyRefreshToken(token) {
        try {
            const decoded = jwt.verify(token, this.refreshTokenSecret);
            const storedHash = this.refreshTokens.get(decoded.userId);
            const tokenHash = this.hashToken(token);

            if (!storedHash || storedHash !== tokenHash) {
                throw new Error('Invalid refresh token');
            }

            return { valid: true, decoded };
        } catch (error) {
            return { valid: false, error: error.message };
        }
    }

    hashToken(token) {
        return crypto
            .createHash('sha256')
            .update(token)
            .digest('hex');
    }

    revokeRefreshToken(userId) {
        this.refreshTokens.delete(userId.toString());
    }

    revokeAllUserTokens(user) {
        // Increment token version to invalidate all existing tokens
        user.tokenVersion += 1;
        this.revokeRefreshToken(user._id);
    }
}

// auth/auth.middleware.js
class AuthMiddleware {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }

    authenticate() {
        return async (req, res, next) => {
            try {
                const token = this.extractToken(req);
                if (!token) {
                    throw new Error('No token provided');
                }

                const { valid, decoded, error } = this.jwtService.verifyAccessToken(token);
                if (!valid) {
                    throw new Error(error);
                }

                // Attach user info to request
                req.user = decoded;
                next();
            } catch (error) {
                res.status(401).json({
                    status: 'error',
                    message: 'Authentication failed: ' + error.message
                });
            }
        };
    }

    authorize(...allowedRoles) {
        return (req, res, next) => {
            if (!req.user) {
                return res.status(401).json({
                    status: 'error',
                    message: 'Authentication required'
                });
            }

            if (!allowedRoles.includes(req.user.role)) {
                return res.status(403).json({
                    status: 'error',
                    message: 'Insufficient permissions'
                });
            }

            next();
        };
    }

    extractToken(req) {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            return authHeader.slice(7);
        }
        return null;
    }
}

// auth/auth.controller.js
class AuthController {
    constructor(jwtService, userService) {
        this.jwtService = jwtService;
        this.userService = userService;
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await this.userService.findByEmail(email);

            if (!user || !(await user.comparePassword(password))) {
                return res.status(401).json({
                    status: 'error',
                    message: 'Invalid credentials'
                });
            }

            const accessToken = this.jwtService.generateAccessToken(user);
            const refreshToken = this.jwtService.generateRefreshToken(user);

            // Set refresh token in HTTP-only cookie
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            });

            res.json({
                status: 'success',
                data: {
                    accessToken,
                    user: {
                        id: user._id,
                        email: user.email,
                        role: user.role
                    }
                }
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Login failed'
            });
        }
    }

    async refreshToken(req, res) {
        try {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) {
                throw new Error('No refresh token provided');
            }

            const { valid, decoded, error } = this.jwtService.verifyRefreshToken(refreshToken);
            if (!valid) {
                throw new Error(error);
            }

            const user = await this.userService.findById(decoded.userId);
            if (!user || user.tokenVersion !== decoded.version) {
                throw new Error('Invalid refresh token');
            }

            const accessToken = this.jwtService.generateAccessToken(user);
            const newRefreshToken = this.jwtService.generateRefreshToken(user);

            res.cookie('refreshToken', newRefreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            res.json({
                status: 'success',
                data: { accessToken }
            });
        } catch (error) {
            res.status(401).json({
                status: 'error',
                message: 'Token refresh failed: ' + error.message
            });
        }
    }

    async logout(req, res) {
        try {
            const refreshToken = req.cookies.refreshToken;
            if (refreshToken) {
                const { decoded } = this.jwtService.verifyRefreshToken(refreshToken);
                if (decoded) {
                    this.jwtService.revokeRefreshToken(decoded.userId);
                }
            }

            res.clearCookie('refreshToken');
            res.json({
                status: 'success',
                message: 'Logged out successfully'
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Logout failed'
            });
        }
    }
}

// Usage example
const express = require('express');
const router = express.Router();

const jwtService = new JWTService();
const authMiddleware = new AuthMiddleware(jwtService);
const authController = new AuthController(jwtService, userService);

// Auth routes
router.post('/login', authController.login.bind(authController));
router.post('/refresh-token', authController.refreshToken.bind(authController));
router.post('/logout', authController.logout.bind(authController));

// Protected route example
router.get(
    '/admin/dashboard',
    authMiddleware.authenticate(),
    authMiddleware.authorize('admin'),
    (req, res) => {
        res.json({ message: 'Admin dashboard data' });
    }
);

module.exports = router;