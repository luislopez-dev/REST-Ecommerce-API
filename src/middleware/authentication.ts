require('dotenv').config();

import Jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY || "super key";

class AuthError extends Error {
  statusCode: number | undefined
}

const verifyToken = (req:any, res:any, next:any) => {

  const authHeader = req.get('Authorization');

  if(!authHeader) {

    const error = new AuthError('Not authenticated');
    error.statusCode = 401;
    throw error;
  }

  const token = authHeader.split(' ')[1];
  let docodedToken;

  try {

    docodedToken = Jwt.verify(token, SECRET_KEY);

  } catch (err) {

    const error = new AuthError('Not authenticated');
    error.statusCode = 401;
    throw error;
    
  }

  if(!docodedToken){
    const error = new AuthError('Not authenticated');
    error.statusCode = 401;
    throw error;
  }

  // req.userId = docodedToken.userId;

  next();
}

export default verifyToken;