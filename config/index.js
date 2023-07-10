require('dotenv').config();

module.exports = {
  Server: {
    PORT: process.env.PORT,
  },
  Database: {
    URI: process.env.MONGODB_URI,
  },
  NODE_ENV: process.env.NODE_ENV,
};
