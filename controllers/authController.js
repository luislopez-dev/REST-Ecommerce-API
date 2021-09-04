const User = require('../models/User');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

exports.register = (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email:email })
     .then( userDoc => {

       if(userDoc){
          console.log("user already exists");
          return;
       }
       const user = new User({
            email: email,
            password: password
       });
       console.log("Use registered successfully !");
       return user.save();
      })
      .catch( err => {
          throw new Error(err.message);
      });
}

exports.login = (req, res, next) => {
    
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email:email, password:password})
    .then( user => {

      if(user){

        console.log("Correct credentials !");
        var token = jwt.sign({userID: user._id}, 'todo-app-super-shared-secret', {expiresIn: '2h'});

        return res.send({token});
      }

      return console.log("Wrong credentials");
    }

    )
    .catch(err => {throw new Error(err.message)} );
}

exports.logoutUser = (req, res, next) => {
  
}