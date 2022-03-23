require('dotenv').config();

import UserModel from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../interfaces/User';
import { HttpErr } from '../interfaces/HttpErr';

const SECRET_KEY = process.env.SECRET_KEY || "my key";

const register =  (req:any, res:any, next:any) => {
   
  const params = req.body as User; 
  const email = params.email;
  const password = params.password;
  const name = params.name;

  UserModel.findOne({ email:email })
    .then( (userDoc:User) => {
      
      if(userDoc){
        const error = new HttpErr('User already exists');
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
    
    const params = req.body as User;
    const email = params.email;
    const password = params.password;
    let loadedUser: User;
  
    UserModel.findOne({email:email})
    .then( (user: User) => {
      if(!user){
        const error = new HttpErr("User not found");
        error.statusCode = 409;
        throw error; 
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);                   
    })
    .then((isEqual:any) => {
      if(!isEqual){                      
        const error = new HttpErr('Wrong password!');
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