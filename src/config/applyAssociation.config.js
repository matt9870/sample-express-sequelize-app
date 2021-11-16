// function applyAssociation(sequelize) {

//     const {user, address} = sequelize.models;

//     user.hasOne(address,{
//         foreignKey:'addressId'
//     });
    
//     address.belongsTo(user,{
//         foreignKey: 'userId'
//     });
// }

// module.exports = {applyAssociation};