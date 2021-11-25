const request = require('supertest');
const app = require('../app');
const { setupDatabase } = require(`./db`)

const addressModel = require('../models/address.model');
const { applyAssociation } = require('../models/association');
const companyModel = require('../models/company.model');
const userModel = require('../models/user.model');

beforeAll(async () => {
    // setupDatabase();
    applyAssociation();
    await userModel.sync({alter: true});
    await addressModel.sync({alter: true});
    await companyModel.sync({alter: true});
})

test('GET company homepage', () => {
    return request(app)
        .get('/company')
        .expect(200)
});

// test(`Create Company`, async () => {
//     await request(app).post('/company/create').send({
//         name: "Ganglion",
//         location: "Pune",
//         employeeCount: 0
//     }).expect(201).then(response => {
//         console.log(response.body);
//     })
// });

test(`Get all employees of company`, async () => {
    await request(app).get(`/company/allEmployees/${1}`)
        .expect(200)
        .then(response => {
            console.log(response.body);
            expect(response.body).toBeDefined();
        });
})