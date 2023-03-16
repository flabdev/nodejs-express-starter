const path = require('path');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const compression = require('compression');
const cors = require('cors');

const add = 5;

const AppError = require('./utils/appError');
const userRouter = require('./routes/userRoute');

// Start express app
const app = express();

app.enable('trust proxy');

app.set('views', path.join(__dirname, 'views'));

// 1) GLOBAL MIDDLEWARES
// Implement CORS
app.use(cors());
app.options('*', cors());

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '50kb' }));
app.use(express.urlencoded({ extended: true, limit: '50kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());
app.use(compression());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// 3) ROUTES
app.use('/api/v1/user', userRouter);

// Error Handling Middleware
app.use((req, res, next) => {
  const error = new Error();
  error.status = 404;
  error.message = 'Not Found';
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({ message: err.message || 'Internal server error' });
});

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
