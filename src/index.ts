require('dotenv').config()

const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const productRouter = require('./routes/ProductRouter');
const authRouter = require('./routes/auth');
const cors = require('cors');
const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT;
const helmet = require('helmet');
const morgan = require('morgan');
const fs = require('fs');
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});

app.use(helmet());
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined', { stream:accessLogStream }));
app.use('/api/auth', authRouter);
app.use('/api', productRouter);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose.set('useFindAndModify', false);
mongoose.connect(MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
 .then( res => {
   app.listen(PORT || 8080);
   console.log('Server running ...');
  })
 .catch(e => {
    console.log(e.message);
  });