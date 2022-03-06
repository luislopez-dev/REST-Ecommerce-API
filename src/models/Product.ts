import { Mongoose } from "mongoose";
import { Schema } from "mongoose";

const mongoose = new Mongoose;
const productSchema = new Schema(
  {
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    manufacturer: {
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
  }, { timestamps: true }
);

const Product =  mongoose.model('Product', productSchema);

export default Product;