require('dotenv').config()

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const productRouter = require('./routes/ProductRouter');
const authRouter = require('./routes/auth');
const cors = require('cors');
const db_user = process.env.MONGO_USER;
const db_pass = process.env.MONGO_PASS;

app.use(cors())
app.use(bodyParser.json());
app.use('/auth', authRouter);
app.use('/product', productRouter);
mongoose.set('useFindAndModify', false);
mongoose.connect(`mongodb+srv://${db_user}:${db_pass}@cluster0.pva0d.mongodb.net/test?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true})
 .then( res => {
   app.listen('8080');
   console.log('Server running ...');
  })
 .catch(e => {
    throw new Error(e.message);
  });

