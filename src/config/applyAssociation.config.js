function applyAssociation(sequelize) {

    const {user, address} = sequelize.models;
    // const { user, address } = sequelize.models;

    user.hasOne(address,{
        foreignKey:'addressId'
    });
    address.belongsTo(user);
}

module.exports = {applyAssociation};