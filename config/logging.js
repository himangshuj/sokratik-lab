'use strict';
var winston = require('winston');
var config = require('./config');
var infoLogger = new (winston.Logger)({
    transports: [
        new (winston.transports.DailyRotateFile)(
            {filename: config.infoLogger,
                colorize: true,
                level: 'info'})
    ]
});

var errorLogger = new (winston.Logger)({
    transports: [
        new (winston.transports.DailyRotateFile)(
            {filename: config.errorLogger,
                colorize: true,
                level: 'error'})
    ]
});

var debugLogger = new (winston.Logger)({
    transports: [
        new (winston.transports.DailyRotateFile)(
            {filename: config.debugLogger,
                colorize: true,
                level: 'debug'})
    ]
});

// the three loggers are a hack otherwise the bloody thing wont compile
exports.info = function (message) {
    infoLogger.info(message);
};
exports.error = function (message) {
    errorLogger.error(message);
};
exports.debug = function (message) {
    debugLogger.debug(message);
};
