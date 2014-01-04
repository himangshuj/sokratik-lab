'use strict';
module.exports = function () {
    /**
     * Module dependencies.
     */
    var mongoose = require('mongoose');


    /**
     * User Schema
     */
    var PresentationSchema = require('./schemas/presentations')(mongoose);

    mongoose.model('Presentation', PresentationSchema);
};