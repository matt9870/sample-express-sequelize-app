const userModel = require('../models/user.model');
const addressModel = require('../models/address.model');
const companyModel = require('../models/company.model');
const { applyAssociation } = require('../models/association');

exports.setupDatabase = async () => {
    console.log(`running db setup`);
    await userModel.sync({alter: true});
    await addressModel.sync({alter: true});
    await companyModel.sync({alter: true});
    applyAssociation();
}