const {Sequelize} = require('sequelize');
const { applyAssociation } = require('./applyAssociation.config');

const sequelize = new Sequelize('sampleSequelizeDB', 'root', 'root',{
    host: 'localhost',
    dialect: 'mysql'
})

const modelDefiners = [
    require('../models/address.model'),
    require('../models/user.model')
]

// We define all models according to their files.
for(const modelDefiner of modelDefiners){
    modelDefiner(sequelize);
}

// We execute any extra setup after the models are defined, such as adding associations.
applyAssociation(sequelize);

module.exports = sequelize;