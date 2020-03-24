const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        default: 'user'
    },
    registerDate: {
        type: Date,
        default: Date.now
    },
    list: [
        {
            ref: 'positions', //название коллекции
            type: Schema.Types.ObjectID //id
        }
    ],
    country:{
        type: String
    }

});

module.exports = mongoose.model('users', userSchema)