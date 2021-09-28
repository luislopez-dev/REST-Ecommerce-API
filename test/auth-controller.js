const expect = require('chai').expect;
const sinon = require('sinon');

const User = require('../models/User');
const AuthController = require('../controllers/authController');

describe('Auth controller - Login', function(){

  it('should throw an error with code 500 if accesing the database fails', function(){

    sinon.stub(User, 'findOne');
    User.findOne.throws();

    const req = {
        body: {
            email: "test@test.com",
            password: "dnjnjk"
        }
    }

    AuthController.login(req, {}, () => {}).then(result => {
        console.log(result);
    });

    // expect(AuthController.login);
    User.findOne.restore();

  })
   
});