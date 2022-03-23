require('dotenv').config();

import UserModel from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const SECRET_KEY = process.env.SECRET_KEY || "my key";

class ControllerError extends Error {
  statusCode: number | undefined
}

const register =  (req:any, res:any, next:any) => {
   
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  UserModel.findOne({ email:email })
    .then( (userDoc:any) => {
      
      if(userDoc){
        const error = new ControllerError('User already exists');
        error.statusCode = 409;
        throw error; 
      }
      bcrypt.hash(password, 12)
      .then(hashedPw => {
        const user = new UserModel({ email: email, password: hashedPw, name:name });
        return user.save();
      })
      .then( (user:any) => {
        const token = jwt.sign({email:user.email, userId: user._id.toString()}, SECRET_KEY, {algorithm: "HS256", expiresIn: '24h'});
        res.status(200).json({ok:true, message: 'User created!', token, userId: user._id.toString()});
      })
      .catch(err => {
        if(!err.statusCode){
          err.statusCode = 500;
        }
        next(err);
      })
    })
    .catch( (err:any) => {
      if(!err.statusCode){
        err.statusCode = 500;          
      }
        next(err);
    });
}

const login = async (req:any, res:any, next:any) => {
    
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser:any;
  
    UserModel.findOne({email:email})
    .then( (user: any) => {
      if(!user){
        const error = new ControllerError("User not found");
        error.statusCode = 409;
        throw error; 
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);                   
    })
    .then((isEqual:any) => {
      if(!isEqual){                      
        const error = new ControllerError('Wrong password!');
        error.statusCode = 401;
        throw error;
      }
      let token = jwt.sign({userId: loadedUser._id.toString()}, 
      SECRET_KEY, {algorithm: "HS256", expiresIn: '24h'});
      res.status(200).send({ok:true, token, userId: loadedUser._id.toString()});
    })
    .catch((err:any) => {  
      if(!err.statusCode){
        err.statusCode = 500;          
      }
      next(err);
    });
}

export {login, register};