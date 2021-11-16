var express = require('express');
const companyController = require('../controllers/company.controller');
var companyRouter = express.Router();

companyRouter.get('/', (req, res) => {
    res.send('company router');
})

companyRouter.post('/create', companyController.createCompany, (req,res) =>{
    res.json({res})
})

companyRouter.get('/allEmployees/:id', companyController.getEmployees, (req,res) =>{
    res.json({res})
})

companyRouter.get('/details/:id',  companyController.getCompany, (req, res) => {
    res.json({res})
})

module.exports = companyRouter;