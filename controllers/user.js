var userModel = require('../models/user');
var jwtDecode = require('jwt-decode');
module.exports.profileRead = function (req, res) {
    if (!req.payload._id) {
      res.status(401).json({
        "message": "UnauthorizedError: private profile"
      });
    } else {
      userId = req.payload._id;
      userModel.find({ where: { id: userId } })
        //.findById(req.payload._id)
        .then(user => {
          //civiliteModel.findById(user.civil);
          res.status(200).json(user.get({ plain: true }));
        })
        .catch(err => res.status(404).json(err));
    }
  };

  module.exports.getProfile = function (req, res) {
    let token = req.headers['authorization'];
    if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
      }
      if (token) {
        var user = jwtDecode(token)
        userModel.findOne({
            where: {
                id:user.user.id,
                email: user.user.email
            }})
        .then(users => res.status(200).json(users))
        .catch(error => res.status(400).json(error));
    //     userModel.find({where:{email:user.user.email}}).then(user => {
    //         console.log(user)
    //         res.status(200).json(user.get({ plain: true }));
    //       })
    //       .catch(err => res.status(404).json(err));
      }
    //         , function(err, userInfo){
    //         console.log('here2', userInfo)
    //         res.json (userInfo)
    //     })
    //   } else {
    //     return res.json({
    //       success: false,
    //       message: 'Auth token is not supplied'
    //     });
    //   }
    // userModel.findOne({email:req.body.email}, function(err, userInfo){

    // })
}