const mongoose = require('mongoose');
const { Schema } = mongoose;

const usersModel = require ('../models/events.model');
const ServerError = require('../libs/errors');

const EventSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    start: { 
        type: Number, 
        required: true 
    },
    duration: {
        type: Number,
        required: true,
        validate (duration) {
            return this.start + duration <= (60*9);
        }
    }},
    {
        timestamps: true,
        versionKey: false
    });

module.exports = mongoose.model('Event', EventSchema);