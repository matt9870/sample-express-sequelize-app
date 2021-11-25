const request = require('supertest');
const app = require('../app');
const { setupDatabase } = require(`./db`);

const addressModel = require('../models/address.model');
const { applyAssociation } = require('../models/association');
const companyModel = require('../models/company.model');
const userModel = require('../models/user.model');

beforeAll(async () => {
    // setupDatabase();
    await userModel.sync({alter: true});
    await addressModel.sync({alter: true});
    await companyModel.sync({alter: true});
    applyAssociation();
})

test('GET /users', async () => {
    await request(app).get('/users').expect(200).then(response => {
        console.log(response.body);
    })
})

// test('Create User', async () => {
//     await request(app).post('/users/create').send({
//         firstName: 'Edwin',
//         lastName: 'Lopez',
//         dateOfBirth: '1985-05-13'
//         }).expect(201);
// })




