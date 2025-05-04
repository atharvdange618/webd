1. **dotenv**
```javascript
require('dotenv').config();
```
- Loads environment variables from a `.env` file
- Keeps sensitive data (API keys, passwords) out of source code
- Different configs for development/production environments

2. **mongoose**
```javascript
const mongoose = require('mongoose');
```
- MongoDB object modeling tool
- Provides schema validation
- Makes it easier to interact with MongoDB
- Handles database connections and operations

3. **bcryptjs**
```javascript
const bcrypt = require('bcryptjs');
```
- Used for password hashing
- More secure than storing plain text passwords
- Includes salt rounds for additional security
- Pure JavaScript implementation (more portable than `bcrypt`)

4. **helmet**
```javascript
const helmet = require('helmet');
app.use(helmet());
```
- Sets various HTTP headers for security
- Protects against common web vulnerabilities
- Includes XSS protection, content security policy, etc.
- Prevents browsers from caching sensitive data

5. **express-rate-limit**
```javascript
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  max: 100,  // 100 requests
  windowMs: 60 * 60 * 1000  // per hour
});
```
- Prevents brute-force attacks
- Limits repeated requests to endpoints
- Helps prevent DoS attacks
- Customizable limits and timeframes

6. **express-mongo-sanitize**
```javascript
const mongoSanitize = require('express-mongo-sanitize');
app.use(mongoSanitize());
```
- Prevents NoSQL injection attacks
- Sanitizes user-supplied data
- Removes any keys containing prohibited characters
- Stops malicious MongoDB operators

7. **xss-clean**
```javascript
const xss = require('xss-clean');
app.use(xss());
```
- Sanitizes user input
- Prevents Cross-Site Scripting (XSS) attacks
- Cleans user input from malicious HTML/JavaScript
- Converts unsafe HTML characters to safe ones

8. **hpp** (HTTP Parameter Pollution)
```javascript
const hpp = require('hpp');
app.use(hpp());
```
- Prevents HTTP Parameter Pollution attacks
- Protects against attacks using multiple parameters with same name
- Cleans up request parameters
- Helps maintain consistent parameter handling

9. **connect-mongo**
```javascript
const MongoStore = require('connect-mongo');
app.use(session({
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI
  })
}));
```
- Stores sessions in MongoDB instead of memory
- Persistent session storage
- Better for production and scalability
- Handles session cleanup automatically

10. **winston** (mentioned in comments as an alternative to morgan)
```javascript
// Example usage
const winston = require('winston');
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```
- Advanced logging system
- Multiple log levels (error, warn, info, etc.)
- Can log to files, console, or external services
- Better for production than morgan
- Supports log rotation and formatting