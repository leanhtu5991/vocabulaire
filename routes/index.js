var express = require('express');
var expressJwt = require('express-jwt');
var router = express.Router();
var db = require('../db');

var ctrlAuth = require('../controllers/authentication');
var ctrlWord = require('../controllers/word');
var ctrlUser = require('../controllers/user');

var auth = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});

//auhtentication
router.post('/login', ctrlAuth.login);
router.post('/register', ctrlAuth.register);
//word
router.get('/getAllWord', ctrlWord.getAllWord);
router.get('/getWordByUser/:userId', ctrlWord.getWordByUser);
router.post('/saveWordToUser/:userId', ctrlWord.saveWordToUser)
//user
router.get('/profile', ctrlUser.getProfile);
module.exports = router;