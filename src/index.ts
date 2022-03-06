require('dotenv').config()

import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import productRouter from './routes/ProductRouter';
import authRouter from './routes/auth';
import cors from 'cors';

const MONGO_URL = process.env.MONGO_URL || "";
const PORT = process.env.PORT;
import helmet from 'helmet';
import morgan from 'morgan';
import fs from "fs";
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});

const app = express();

app.use(helmet());
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined', { stream:accessLogStream }));
app.use('/api/auth', authRouter);
app.use('/api', productRouter);

app.use((error:any, req:any, res:any, next:any) => {
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