const { fn, col } = require('sequelize');
const Company = require('../models/company.model');
const User = require('../models/user.model');

exports.createCompany = async (req, res) => {
    try {
        if (!req.body)
            return res.status(400).send({
                message: 'Company content can not be empty'
            })
            console.log(req.body);
        await Company.create({
            name: req.body.name,
            employeeCount: req.body.employeeCount,
            location: req.body.location
        }).then(company => {
            return res.status(201).json({
                message: 'Company created',
                company
            });
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: `Server Error occurred`
        })
    }
}

exports.getEmployees = async (req, res) => {
    try {
        await Company.findByPk(req.params.id, {
            attributes: ['name'],
            include: {
                model: User,
                as: 'Employees',
                attributes: ['id', [fn('CONCAT', col(`firstName`), ' ', col(`lastName`)), `Name`]]
            }
        }).then(companyInformation => {
            let message = `Employees found`
            if (!companyInformation.Employees.length > 0) {
                companyInformation = `No employees found associated with ${companyInformation.name}`
            }
            // console.log(message);
            return res.status(200).send({ message, companyInformation });
            
        }).catch(error => {
            console.error(error);
            return res.status(500).send({
                message: `Id not associated with any company or some other error occurred`
            })
        })
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: `Server Error occurred`
        })
    }
}

exports.getCompany = async (req, res) => {
    try {
        await Company.findByPk(req.params.id, {
            attributes: ['name', 'employeeCount']
        }).then(company => {
            return res.status(200).json({
                message: 'Company found',
                company
            });
        })
    } catch (error) {
        console.error(`Error while getting company details - `, error);
        return res.status(500).send({
            message: `Server Error occurred`
        })
    }
}