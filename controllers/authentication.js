var passport = require('passport');
var userModel = require('../models/user');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
var jwtDecode = require('jwt-decode');

module.exports.login = function (req, res) {
    console.log('login')
    var email = req.body.email;
    var password = req.body.password;
    userModel.findOne({ where: { email: email }})
    .then(user => {
        // Return if user not found in database
        if (user === null) {
            console.log('not found this user'
        )
            res.json({status:"error", message: "not found this user", data:null});
        } else {
             // Return if password is wrong
            if (!user.validPassword(password)) {
                console.log('pass wrong')
                res.json({status:"error", message: "password is wrong", data:null});
            }
            // If credentials are correct, return the user object
            else {
                console.log('user found')
                const token = jwt.sign({user: user}, req.app.get('secretKey'), { expiresIn: '1h' });
                res.json({status:"success", message: "user found!!!", user: user, token:token});
            } 
        }  
    })
}
module.exports.register = function (req, res) {
    var d = new Date();
    var userInfo = userModel.build({
        role: 2,
        civil: req.body.civil,  
        tel: req.body.tel,
        datesignup: d,
        birthday: req.body.birthday,
        name: req.body.name,
        email: req.body.email.toLowerCase(),
    });
    userInfo.setPassword = req.body.password;
    userInfo.save().then(() => { 
        const token = jwt.sign({user: userInfo}, req.app.get('secretKey'), { expiresIn: '1h' });
        res.json({status:"success", message: "user found!!!", user: userInfo, token:token});
        // var token = user.generateJwt(); res.status(201).json({ "token": token }) 
    });
};