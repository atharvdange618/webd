# Understanding JWT Authentication System

## 1. What is JWT?
JSON Web Token (JWT) is a secure way to transmit information between parties as a JSON object. In authentication, it's used to keep users logged in and manage their sessions securely.

## 2. Token Types
This system uses two types of tokens:

1. **Access Token**
   - Short-lived (15 minutes in this code)
   - Used for accessing protected routes
   - Contains user information (ID, email, role)
   - Sent with each request in the Authorization header

2. **Refresh Token**
   - Long-lived (7 days in this code)
   - Used to get new access tokens when they expire
   - Stored securely in an HTTP-only cookie
   - More secure than access tokens

## 3. System Components

### 3.1 JWTService
This class handles all token-related operations:

```javascript
// Key functions:
generateAccessToken(user)  // Creates new access token
generateRefreshToken(user) // Creates new refresh token
verifyAccessToken(token)   // Validates access token
verifyRefreshToken(token)  // Validates refresh token
```

### 3.2 AuthMiddleware
Handles request authentication and authorization:

```javascript
authenticate() // Verifies the access token
authorize(...roles) // Checks if user has required role
```

### 3.3 AuthController
Manages authentication endpoints:

```javascript
login()        // Handles user login
refreshToken() // Gets new access token using refresh token
logout()       // Handles user logout
```

## 4. Authentication Flow

### 4.1 Login Flow
1. User sends email and password
2. Server validates credentials
3. If valid:
   - Generates access token
   - Generates refresh token
   - Sets refresh token in HTTP-only cookie
   - Returns access token to client

```javascript
// Example login response
{
    status: 'success',
    data: {
        accessToken: 'xxx.yyy.zzz',
        user: {
            id: '123',
            email: 'user@example.com',
            role: 'user'
        }
    }
}
```

### 4.2 Accessing Protected Routes
1. Client includes access token in request header:
   ```javascript
   Authorization: Bearer xxx.yyy.zzz
   ```
2. AuthMiddleware:
   - Extracts token from header
   - Verifies token
   - Checks user permissions
   - Allows/denies access

### 4.3 Token Refresh Flow
1. Access token expires
2. Client sends refresh token (automatically included in cookies)
3. Server:
   - Validates refresh token
   - Generates new access token
   - Generates new refresh token
   - Updates cookie with new refresh token
   - Returns new access token

## 5. Security Features

### 5.1 Token Storage
- Access tokens: Stored in client memory
- Refresh tokens: 
  - Stored in HTTP-only cookies (client-side)
  - Hashed and stored in server memory/database
  - Protected against XSS attacks

### 5.2 Token Invalidation
```javascript
revokeRefreshToken(userId)    // Invalidates single refresh token
revokeAllUserTokens(user)     // Invalidates all user tokens
```

### 5.3 Security Measures
- Token expiration
- HTTP-only cookies for refresh tokens
- Token version tracking for mass invalidation
- Secure cookie settings in production
- Role-based access control
    ```javascript
    const ROLES = {
    USER: 'user',
    ADMIN: 'admin',
    MODERATOR: 'moderator',
    EDITOR: 'editor'
    };

    // Role Hierarchy
    const ROLE_HIERARCHY = {
        user: {
            level: 1,
            permissions: ['read:own_profile', 'edit:own_profile']
        },
        editor: {
            level: 2,
            permissions: ['read:own_profile', 'edit:own_profile', 'create:content', 'edit:content']
        },
        moderator: {
            level: 3,
            permissions: [
            'read:own_profile', 
            'edit:own_profile',
            'read:user_profiles',
            'moderate:content',
            'delete:content']
        },
        admin: {
            level: 4,
            permissions: [
            'read:own_profile',
            'edit:own_profile',
            'read:user_profiles',
            'edit:user_profiles',
            'create:content',
            'edit:content',
            'delete:content',
            'manage:users',
            'manage:roles']
        }
    };
    ```

## 6. Implementation Example

```javascript
// Protected route setup
router.get(
    '/admin/dashboard',
    authMiddleware.authenticate(),  // First check: Is token valid?
    authMiddleware.authorize('admin'), // Second check: Is user admin?
    (req, res) => {
        res.json({ message: 'Admin dashboard data' });
    }
);
```

## 7. Best Practices

1. **Environment Variables**
   - Store secrets in environment variables
   - Different settings for development/production

2. **Token Storage**
   - Use Redis for refresh tokens in production
   - Never store tokens in localStorage

3. **Security Headers**
   - Use secure cookies in production
   - Implement proper CORS settings
   - Set appropriate token expiration times

4. **Error Handling**
   - Proper error messages
   - Consistent error response format
   - Security-conscious error details