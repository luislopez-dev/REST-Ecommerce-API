require('dotenv').config()

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const productRouter = require('./routes/ProductRouter');
const authRouter = require('./routes/auth');
const cors = require('cors');
const MONGO_URL = process.env.MONGO_URL;

app.use(cors())
app.use(bodyParser.json());
app.use('/auth', authRouter);
app.use('/product', productRouter);
mongoose.set('useFindAndModify', false);
mongoose.connect(MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
 .then( res => {
   app.listen('8080');
   console.log('Server running ...');
  })
 .catch(e => {
    throw new Error(e.message);
  });

