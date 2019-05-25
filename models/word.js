const Sequelize = require('sequelize');
var db = require('../db');

const Word = db.get().define('word', {
    word: Sequelize.STRING,
    type: Sequelize.INTEGER,
    translate: Sequelize.STRING,
    example1: Sequelize.STRING,
    example2: Sequelize.STRING,
    iduser: Sequelize.INTEGER,
    idbox: Sequelize.INTEGER,
    validatetime: Sequelize.DATE,
    status: Sequelize.INTEGER, 
    id: { type: Sequelize.INTEGER, primaryKey: true }
    }, {
        freezeTableName: true,
    });

module.exports = Word;