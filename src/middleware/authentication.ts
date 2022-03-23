require('dotenv').config();
import Jwt from "jsonwebtoken";
import { HttpErr } from "../interfaces/HttpErr";

const SECRET_KEY = process.env.SECRET_KEY || "super key";

const verifyToken = (req:any, res:any, next:any) => {

  const authHeader = req.get('Authorization');

  if(!authHeader) {

    const error = new HttpErr('Not authenticated');
    error.statusCode = 401;
    throw error;
  }

  const token = authHeader.split(' ')[1];
  let docodedToken;

  try {

    docodedToken = Jwt.verify(token, SECRET_KEY);

  } catch (err) {

    const error = new HttpErr ('Not authenticated');
    error.statusCode = 401;
    throw error;
    
  }

  if(!docodedToken){
    const error = new HttpErr ('Not authenticated');
    error.statusCode = 401;
    throw error;
  }

  // req.userId = docodedToken.userId;

  next();
}

export default verifyToken;