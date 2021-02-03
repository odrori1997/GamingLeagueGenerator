const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    displayName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    uuid: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        min: 18,
        max: 65
    },
    location: {
        type: Number,
        required: true,
        max: 5
    }
},
    {
        timestamps: true
    });



const User = mongoose.model('User', userSchema);
module.exports = User;