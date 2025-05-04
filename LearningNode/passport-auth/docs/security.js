// security.js - A comprehensive security configuration module
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const session = require('express-session');
const csrf = require('csurf');

class SecurityConfig {
    constructor(app) {
        this.app = app;
    }

    // 1. Basic Security Headers
    setupHelmet() {
        this.app.use(helmet());  // Basic security headers

        // Custom CSP (Content Security Policy)
        this.app.use(
            helmet.contentSecurityPolicy({
                directives: {
                    defaultSrc: ["'self'"],  // Only allow resources from same origin
                    scriptSrc: ["'self'", "'unsafe-inline'"],  // Scripts from same origin and inline
                    styleSrc: ["'self'", "'unsafe-inline'"],   // Styles from same origin and inline
                    imgSrc: ["'self'", "data:", "https:"],     // Images from same origin, data URIs, and HTTPS
                    connectSrc: ["'self'"],  // XMLHttpRequest, WebSocket, etc.
                    fontSrc: ["'self'"],     // Font files
                    objectSrc: ["'none'"],   // Plugins like Flash
                    mediaSrc: ["'self'"],    // Audio and video
                    frameSrc: ["'none'"],    // Prevent iframe usage
                },
            })
        );

        return this;
    }

    // 2. Rate Limiting
    setupRateLimiting() {
        // General rate limiter
        const generalLimiter = rateLimit({
            max: 100,                      // Max 100 requests
            windowMs: 60 * 60 * 1000,     // Per 1 hour
            message: 'Too many requests from this IP, please try again in an hour',
            standardHeaders: true,         // Return rate limit info in headers
            legacyHeaders: false,         // Disable X-RateLimit headers
        });

        // Stricter login rate limiter
        const loginLimiter = rateLimit({
            max: 5,                       // Max 5 attempts
            windowMs: 15 * 60 * 1000,    // Per 15 minutes
            message: 'Too many login attempts, please try again later',
            standardHeaders: true,
            legacyHeaders: false,
        });

        this.app.use('/api/', generalLimiter);
        this.app.use('/api/auth/login', loginLimiter);

        return this;
    }

    // 3. CORS Configuration
    setupCORS() {
        const corsOptions = {
            origin: process.env.ALLOWED_ORIGINS.split(','),
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
            allowedHeaders: ['Content-Type', 'Authorization'],
            credentials: true,            // Allow cookies
            maxAge: 86400                // Cache preflight request for 1 day
        };

        this.app.use(cors(corsOptions));
        return this;
    }

    // 4. Session Security
    setupSession() {
        const sessionConfig = {
            secret: process.env.SESSION_SECRET,
            name: 'sessionId',           // Change from default 'connect.sid'
            cookie: {
                httpOnly: true,            // Prevent XSS accessing cookie
                secure: process.env.NODE_ENV === 'production',
                maxAge: 24 * 60 * 60 * 1000, // 24 hours
                sameSite: 'strict'         // CSRF protection
            },
            resave: false,
            saveUninitialized: false
        };

        this.app.use(session(sessionConfig));
        return this;
    }

    // 5. CSRF Protection
    setupCSRF() {
        const csrfProtection = csrf({
            cookie: {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production'
            }
        });

        // Apply CSRF protection to all POST, PUT, DELETE routes
        this.app.use((req, res, next) => {
            if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
                csrfProtection(req, res, next);
            } else {
                next();
            }
        });

        // Provide CSRF token to frontend
        this.app.get('/api/csrf-token', csrfProtection, (req, res) => {
            res.json({ csrfToken: req.csrfToken() });
        });

        return this;
    }

    // 6. Data Sanitization
    setupSanitization() {
        // NoSQL query injection prevention
        this.app.use(mongoSanitize());

        // XSS prevention
        this.app.use(xss());

        // Prevent HTTP Parameter Pollution
        this.app.use(hpp({
            whitelist: ['price', 'rating'] // Parameters that can be duplicated
        }));

        return this;
    }

    // 7. Request Body Parsing Security
    setupBodyParsing() {
        this.app.use(express.json({ limit: '10kb' }));  // Limit request body size
        this.app.use(express.urlencoded({ extended: true, limit: '10kb' }));
        return this;
    }

    // 8. Security Middleware for Routes
    createAuthMiddleware() {
        return async (req, res, next) => {
            try {
                // Check for auth header
                const authHeader = req.headers.authorization;
                if (!authHeader || !authHeader.startsWith('Bearer ')) {
                    throw new Error('No token provided');
                }

                // Verify token
                const token = authHeader.split(' ')[1];
                // Add your JWT verification logic here

                next();
            } catch (error) {
                res.status(401).json({ error: 'Authentication failed' });
            }
        };
    }

    // 9. Error Handling
    setupErrorHandling() {
        // Handle 404
        this.app.use((req, res, next) => {
            res.status(404).json({
                status: 'error',
                message: 'Route not found'
            });
        });

        // Global error handler
        this.app.use((err, req, res, next) => {
            const statusCode = err.statusCode || 500;
            const status = err.status || 'error';

            res.status(statusCode).json({
                status: status,
                message: process.env.NODE_ENV === 'development'
                    ? err.message
                    : 'Something went wrong'
            });
        });

        return this;
    }

    // Initialize all security features
    init() {
        return this
            .setupHelmet()
            .setupRateLimiting()
            .setupCORS()
            .setupSession()
            .setupCSRF()
            .setupSanitization()
            .setupBodyParsing()
            .setupErrorHandling();
    }
}

module.exports = SecurityConfig;