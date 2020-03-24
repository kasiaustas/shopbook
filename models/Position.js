const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const positionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    imageSrc:{
        type: String,
        default: ''
    },
    externalLink:{
        type: String,
        required: true
    },
    description:{
        type: String
    },
    category: {
        ref: 'categories', //название коллекции
        type: Schema.Types.ObjectID //id
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectID
    },
    registerDate: {
        type: Date,
        default: Date.now
    },
    active:{
        type: Boolean,
        default: false
    },
    countryList: [
        {
            name: {
                type: String
            }
        }
    ],
    favorites:{
        type: Number,
        default: 0
    },
    advertising:{
        type: String
    }

});

module.exports = mongoose.model('positions', positionSchema)