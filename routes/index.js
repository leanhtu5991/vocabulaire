var express = require('express');
var expressJwt = require('express-jwt');
var router = express.Router();
var db = require('../db');

var ctrlAuth = require('../controllers/authentication');

router.get('/login', ctrlAuth.login);
module.exports = router;