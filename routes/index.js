var express = require('express');
var expressJwt = require('express-jwt');
var router = express.Router();
var db = require('../db');

var ctrlAuth = require('../controllers/authentication');

//auhtentication
router.post('/login', ctrlAuth.login);
router.post('/register', ctrlAuth.register);
module.exports = router;