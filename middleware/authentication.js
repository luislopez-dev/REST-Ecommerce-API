const jwt = require("jsonwebtoken");
  
let verifyToken = (req, res, next) => {

  const token = req.headers.authorization.split(' ')[1];

  jwt.verify(token, "secret", (err, decoded) => {

    if(err){
      return res.status(401).json({ok:false, err})
    }
    next();
  });
}

module.exports = { verifyToken };