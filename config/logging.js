'use strict';
var winston = require('winston');
var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.File)(
            {filename: '/tmp/a.log',
            colorize:true,
            maxSize:10485760})
    ]
});
