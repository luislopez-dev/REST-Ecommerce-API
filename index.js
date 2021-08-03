const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const productRouter = require('./routes/ProductRouter');
const authRouter = require('./routes/auth');
const cors = require('cors');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
require('dotenv').config()
const db_user = process.env.MONGO_USER;
const db_pass = process.env.MONGO_PASS;

// app.use(
//   session({
//     secret: 'my secret',
//     resave: false,
//     saveUninitialized: false,
//     store: store
//   })
// );

app.use(cors())
app.use(bodyParser.json());
// app.use(expressJwt({secret: 'todo-app-super-shared-secret',  algorithms: ['HS256']}).unless({path: ['/auth/login']}));
app.use('/auth', authRouter);
app.use('/product', productRouter);

mongoose.set('useFindAndModify', false);
mongoose.connect(`mongodb+srv://${db_user}:${db_pass}@cluster0.pva0d.mongodb.net/test?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true})
 .then( res => {
   app.listen('8080');
   console.log('Server running ...');
  })
 .catch(e => {
    console.log(e.message);
  });