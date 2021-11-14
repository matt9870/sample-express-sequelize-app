const { DataTypes } = require('sequelize');
// const sequelize = require('../config/db.config');
// const Address = require('./address.model');


module.exports = (sequelize) => {
    sequelize.define('user',{
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dateOfBirth: {
            type: DataTypes.DATE,
            allowNull: false
        }
    })
}

// const User = sequelize.define('user', {
//     firstName: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     lastName: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     dateOfBirth: {
//         type: DataTypes.DATE,
//         allowNull: false
//     },
//     // addressId: {
//     //     type: DataTypes.INTEGER,
//     // }
// })


//     User.associations = (models) => {
//         User.hasOne(models.addresses, {
//             as: 'address',
//             foreignKey: 'addressId'
//         })
//     }    
// User.hasOne(Address);

// module.exports = User;