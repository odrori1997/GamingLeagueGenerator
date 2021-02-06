const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    displayName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    uuid: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true,
        min: 18,
        max: 65
    },
    location: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    });



const User = mongoose.model('User', userSchema);
module.exports = User;