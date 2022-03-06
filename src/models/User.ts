// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

import { Mongoose } from "mongoose";
import { Schema } from "mongoose";

const mongoose  = new Mongoose;

const userSchema = new Schema(
  {
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
  }, { timestamps: true }
);

const User = mongoose.model('user', userSchema);

export default User;