#### How to use security configuration module in your main application:

```javascript
const express = require('express');
const SecurityConfig = require('./security');

const app = express();

// Initialize security configurations
const security = new SecurityConfig(app);
security.init();

// Your routes and other middleware go here

// Example of using the auth middleware
app.get('/api/protected', 
  security.createAuthMiddleware(), 
  (req, res) => {
    res.json({ message: 'Protected route accessed' });
  }
);
```

Required environment variables in `.env`:
```
NODE_ENV=production
SESSION_SECRET=your-very-long-random-secret
ALLOWED_ORIGINS=https://yourdomain.com,https://api.yourdomain.com
```

Key Security Aspects Explained:

1. **Helmet Configuration**:
   - Sets 11 different security headers
   - CSP controls which resources can be loaded
   - Prevents clickjacking, XSS, and other attacks

2. **Rate Limiting**:
   - Prevents brute force attacks
   - Different limits for different routes
   - IP-based tracking

3. **CORS (Cross-Origin Resource Sharing)**:
   - Controls which domains can access your API
   - Methods and headers whitelist
   - Credentials handling

4. **Session Security**:
   - Secure cookie settings
   - Session fixation protection
   - CSRF protection via SameSite

5. **CSRF Protection**:
   - Token-based protection
   - Selective application to state-changing methods
   - Cookie security

6. **Data Sanitization**:
   - NoSQL injection prevention
   - XSS prevention
   - Parameter pollution protection

7. **Request Parsing Security**:
   - Limited request body size
   - Protected against large payloads
   - Controlled data parsing

Additional Security Best Practices:

1. **Input Validation**:
```javascript
const { body, validationResult } = require('express-validator');

app.post('/api/user',
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Process valid input
  }
);
```

2. **API Security Headers**:
```javascript
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Cache-Control', 'no-store');
  next();
});
```

3. **Secure Password Storage**:
```javascript
const bcrypt = require('bcryptjs');

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
}

async function verifyPassword(password, hash) {
  return await bcrypt.compare(password, hash);
}
```