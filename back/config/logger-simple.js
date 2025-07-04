const winston = require('winston');
const path = require('path');

console.log('Logger initialization started...');

// Simple logger configuration
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: path.join(__dirname, '..', 'logs', 'app.log') })
  ]
});

console.log('Logger created successfully');

module.exports = { logger };

console.log('Logger exported');
