const mongoose = require('mongoose');
const userSchema = require('./user.model');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    eventName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    date: {
        type: Date,
        required: true
    },
    ageMin: {
        type: Number,
        required: true,
        min: 18,
        max: 65
    },
    ageMax: {
        type: Number,
        required: true,
        min: 18,
        max: 65
    },
    location: {
        type: String,
        required: true,
    },
    participants: {
        type: [String],
        required: false
    },
    hostID: {
        type: String,
        required: true    
    }
},
    {
        timestamps: true
    });



const Event = mongoose.model('Event', eventSchema);
module.exports = Event;