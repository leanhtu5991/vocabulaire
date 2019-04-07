const Sequelize = require('sequelize');
// const config = require('./config/app')
const local = require('./config/local')

// const sequelize = new Sequelize(config.database, config.user, config.password, {
//     host: config.host,
//     port: config.port,
//     dialect: 'mysql',
//     operatorsAliases: false,
//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     },
//     define: {
//         timestamps: false
//     }
// });
// When use localhost phpmyadmin
const sequelize = new Sequelize(local.database, local.user, local.password, {
    host: local.host,
    port: local.port,
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        timestamps: false
    }
}); 

exports.get = function() {
    return sequelize;
}

exports.tryConnect = function() {
    return sequelize
        .authenticate()
        .then(() => { console.log('Database connection has been established successfully.'); })
        .catch(err => {console.error('Unable to connect to the database.', err);});
}