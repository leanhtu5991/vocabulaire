const Sequelize = require('sequelize');
var db = require('../db');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); 
const saltRounds = 10;

const User = db.get().define('user', {
    role: Sequelize.INTEGER,
    civil: Sequelize.INTEGER,
    tel: Sequelize.STRING,
    datesignup: Sequelize.DATE,
    birthday : Sequelize.DATE,
    name: Sequelize.STRING,
    email: { type: Sequelize.STRING, unique: true },
    password: Sequelize.STRING,
    salt: Sequelize.STRING
},
    {
        freezeTableName: true,
        setterMethods: {
            setPassword(password) {
                this.salt = crypto.randomBytes(16).toString('hex');
                this.password = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
                // this.password = bcrypt.hashSync(this.password, saltRounds);
            }
        }
    });
User.prototype.validPassword = function (password) {
    var pwd = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.password === pwd;
}
module.exports = User;