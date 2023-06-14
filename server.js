const mongoose = require('mongoose');
const http = require('http');
const config = require('./config/index');

const app = require('./app');

const port = config.Server.PORT || 5000;

const server = http.createServer(app);

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

const DB = config.Database.URI;

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('error', err => {
  console.log('err', err);
});

mongoose.connection.on('connected', () => {
  console.log('mongoose is connected...');
});

mongoose.connection.on('disconnected', () => {
  console.log('mongoose is disconnected...');
});

mongoose.Promise = global.Promise;

process.on('SIGTERM', () => {
  console.log('SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('Process terminated!');
  });
});
