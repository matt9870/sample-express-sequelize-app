const User = require('./user.model');
const Address = require('./address.model');
const Company = require('./company.model');
const { getEmployees } = require('../controllers/company.controller');

function applyAssociation() {
    Address.belongsTo(User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
    });
    
    Company.hasMany(User, {
        as: 'Employees',
        foreignKey: 'companyId'
    });
}

module.exports = {applyAssociation}
