const { Sequelize } = require('sequelize');
require('dotenv').config()


let user = process.env.DB_USER;
let pass = process.env.DB_PASS;
// const sequelize = new Sequelize('Database Name', 'mysql user name', 'mysql user password', {
//     host: 'localhost',
//     dialect: 'mysql'
// })
// console.log('test', process.env.DB_USER, process.env.DB_PASS);
const sequelize = new Sequelize(process.env.DATABASE, user, pass, {
    host: 'localhost',
    dialect: 'mysql'
})


// const modelDefiners = [
//     require('../models/address.model'),
//     require('../models/user.model')
// ]

// // We define all models according to their files.
// for(const modelDefiner of modelDefiners){
//     modelDefiner(sequelize);
// }

// // We execute any extra setup after the models are defined, such as adding associations.
// applyAssociation(sequelize);

module.exports = sequelize;