const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

module.exports = sequelize.define('company', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    employeeCount: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
})