const jwt = require("jsonwebtoken");
  
let verifyToken = (req, res, next) => {

  const authHeader = req.get('Authorization');

  if(!authHeader) {

    const error = new Error('Not authenticated');
    error.statusCode = 401;
    throw error;
  }

  const token = authHeader.split(' ')[1];
  let docodedToken;

  try {

    docodedToken = jwt.verify(token, "secret");

  } catch (err) {

    err.statusCode = 500;
    throw err;
  }

  if(!docodedToken){
    const error = new Error('Not authenticated');
    error.statusCode = 401;
    throw error;
  }

  req.userId = docodedToken.userId;

  next();
}

module.exports = { verifyToken };