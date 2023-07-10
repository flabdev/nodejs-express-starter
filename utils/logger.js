const winston = require('winston');

const logger = winston.createLogger({
  format: winston.format.combine(winston.format.prettyPrint()),
  transports: [
    new winston.transports.Console(),

    // add file configuration for exporting the JSON.
  ],
});

const writeResponseLog = payload => {
  logger.info(
    JSON.stringify(
      {
        requestId: payload.ip,
        statusCode: payload?.statusCode,
        path: payload?.path,
        method: payload?.method,
      },
      null,
      1,
    ),
  );
};

const writeErrorLog = (payload, request) => {
  logger.error(
    JSON.stringify(
      {
        requestId: request?.ip,
        statusCode: payload?.statusCode,
        path: payload?.path,
        method: payload?.method,
        error: payload?.message,
        stack: payload?.stack,
      },
      null,
      1,
    ),
  );
};

module.exports = { writeResponseLog, writeErrorLog };
