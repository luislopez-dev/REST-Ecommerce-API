const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ammount: {
        type: Number,
        required: true
    },
    imgURL: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Product', productSchema);