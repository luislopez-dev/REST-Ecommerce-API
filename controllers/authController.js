const User = require('../models/User');
const jwt = require('jsonwebtoken');

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

        let token = jwt.sign({user:user}, 'secret', {expiresIn: '24h'});

        res.json({ok:true, token});

      }else{

        return res.status(400).send({
          ok:false,
          err: {message: "Wrong credentials"}
        });
      }      
    }

    )
    .catch(err => {throw new Error(err.message)} );
}

exports.logoutUser = (req, res, next) => {
  
}