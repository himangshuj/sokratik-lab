process.env.NODE_ENV = process.env.NODE_ENV || 'test';
var mongoose = require('mongoose'),
    config = require('../../config/config');
var connected = false;
module.exports = function () {
    if (!connected) {
        mongoose.connect(config.db);
        connected = true;

    } else{

    }


};