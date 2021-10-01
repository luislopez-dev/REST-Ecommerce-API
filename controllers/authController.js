const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = (req, res, next) => {
  
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  User.findOne({ email:email })
    .then( userDoc => {
      
      if(userDoc){
        const error = new Error('User already exists');
        error.statusCode = 409;
        throw error; 
      }
      bcrypt.hash(password, 12)
      .then(hashedPw => {
        const user = new User({ email: email, password: hashedPw, name:name });
        return user.save();
      })
      .then(user => {
        let token = jwt.sign({email:user.email, userId: user._id.toString()}, 'secret', {expiresIn: '24h'});
        res.status(200).json({ok:true, message: 'User created !', token, userId: user._id.toString()});
      })
      .catch(err => {
        if(!err.statusCode){
          err.statusCode = 500;
        }
        next(err);
      })
    })
    .catch( err => {
      if(!err.statusCode){
        err.statusCode = 500;          
      }
        next(err);
    });
}

exports.login = async (req, res, next) => {
    
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    
    User.findOne({email:email})
    .then( user => {
      if(!user){
        const error = new Error("A user with this email address doesn't exist");
        error.statusCode = 409;
        throw error; 
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);                   
    })
    .then(isEqual => {
      if(!isEqual){                      
        const error = new Error('Wrong password!');
        error.statusCode = 401;
        throw error;
      }
      let token = jwt.sign({email:loadedUser.email, 
                            userId: loadedUser._id.toString()}, 
                            'secret', {expiresIn: '24h'});
      res.status(200).send({ok:true, token, userId: loadedUser._id.toString()});
    })
    .catch(err => {  
      if(!err.statusCode){
        err.statusCode = 500;          
      }
      next(err);
    });
}
