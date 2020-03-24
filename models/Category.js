const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    active:{
        type: Boolean,
        default: false
    },
    user: {
        ref: 'users', //название коллекции
        type: Schema.Types.ObjectID //id
    }

});

module.exports = mongoose.model('categories', categorySchema)