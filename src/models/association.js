const User = require('./user.model');
const Address = require('./address.model');

User.associations = function (models) {
    User.hasOne(models.Address, {
        as: 'address',
        foreignKey: 'addressId'
    })
}

Address.associate = (models) => {
    Address.belongsTo(models.User,{
        as: 'user', 
        foreignKey:'userId'
    })
}