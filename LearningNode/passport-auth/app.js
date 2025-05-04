// Import required modules
var createError = require('http-errors');          // For creating HTTP error objects
var express = require('express');                  // The Express framework
var path = require('path');                        // For handling file paths
var cookieParser = require('cookie-parser');       // For parsing cookies
var logger = require('morgan');                    // For logging HTTP requests
const fs = require("fs")                          // File system operations
const passport = require("passport")              // Authentication middleware
const LocalStrategy = require("passport-local")   // Username/password authentication strategy
const session = require("express-session")        // Session middleware
const FileStore = require('session-file-store')(session);  // Session storage on filesystem
const sessionPath = path.join(__dirname, 'sessions');      // Path for session files

// Create sessions directory if it doesn't exist
if (!fs.existsSync(sessionPath)) {
  fs.mkdirSync(sessionPath, { recursive: true });
}

// Import routes
var indexRouter = require('./routes/index');

// Create Express application
var app = express();

// Session configuration
app.use(session({
  store: new FileStore({
    path: sessionPath                  // Where to store session files
  }),
  secret: "Helloworld",               // Secret used to sign session ID cookie
  resave: false,                      // Don't save session if unmodified
  saveUninitialized: true,            // Save uninitialized sessions
  cookie: {
    secure: false,                    // Cookie can be transmitted over HTTP
    maxAge: 24 * 60 * 60 * 1000      // Cookie expires after 24 hours
  }
}))

// Initialize Passport and restore authentication state from session
app.use(passport.initialize())
app.use(passport.session())

// Mock user (in production, this would come from a database)
const user = {
  id: '1',
  email: "atharvdange618@gmail.com",
  password: "password"
}

// Serialization: determines which data of the user object should be stored in the session
passport.serializeUser((user, done) => {
  done(null, user.id)                 // Store only user ID in session
})

// Deserialization: retrieves user details from session data
passport.deserializeUser((id, done) => {
  const _user = user.id === id ? user : false  // Find user by ID
  done(null, _user)
})

// Configure Local Strategy for authentication
passport.use(new LocalStrategy({
  usernameField: "email"              // Use email field instead of username
}, (email, password, done) => {
  // Verify user credentials
  if (email === user.email && password === user.password) {
    return done(null, user)           // Authentication successful
  } else {
    return done(null, false)          // Authentication failed
  }
}))

// View engine setup
app.set('views', path.join(__dirname, 'views'));  // Set views directory
app.set('view engine', 'pug');                    // Use Pug as template engine

// Middleware stack
app.use(logger('dev'));                          // HTTP request logger
app.use(express.json());                         // Parse JSON payloads
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies
app.use(cookieParser());                         // Parse cookies
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Route handler
app.use('/', indexRouter);

// 404 Error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// General error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;