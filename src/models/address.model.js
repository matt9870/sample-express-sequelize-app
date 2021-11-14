const { DataTypes } = require('sequelize');
// const sequelize = require('../config/db.config');
// const User = require('./user.model');

module.exports = (sequelize) => {
    sequelize.define('address',{
        houseNumber: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false
        },
        countryCode: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}

// const Address = sequelize.define('address', {
//     houseNumber: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//     },
//     city: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     state: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     countryCode: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     // userId: {
//     //     type: DataTypes.INTEGER,
//     // }
// })

// Address.associations = function (models) {
//     Address.belongsTo(models.users, {
//         as: 'user',
//         foreignKey: 'userId'
//     })
// }

// Address.belongsTo(User,{
//     foreignKey: `userId`
// });

// module.exports = Address;