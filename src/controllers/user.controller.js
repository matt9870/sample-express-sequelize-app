const User = require('../models/user.model');
const { Op, fn, col } = require('sequelize');
const Address = require('../models/address.model');
const Company = require('../models/company.model');

exports.createUser = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(401).send({
                message: `New user details need to be provided`,
                body: req.body
            })
        }
        let userData = req.body;
        await User.create({
            firstName: userData.firstName,
            lastName: userData.lastName,
            dateOfBirth: userData.dateOfBirth
            // companyId: userData.companyId
        }).then(async user => {
            return res.status(201).send({
                message: `success`,
                user
            })
            // Company.findByPk(user.companyId).then(company => {
            //     company.update({
            //         employeeCount: company.employeeCount + 1
            //     }).then(newCompanyData => {                    
            //         return res.status(201).send({
            //             message: `success`,
            //             user,
            //             newCompanyData

            //         }).catch(err => {
            //             console.error(err);
            //             return res.status(500).send({
            //                 message: `error`,
            //                 error: err
            //             })
            //         })
            //     }).catch(err => {
            //         console.error(err);
            //         return res.status(401).send({
            //             message: `user could not be built`,
            //             err
            //         })
            //     })
            // }).catch(err => {
            //     console.error(err);
            //     return res.status(201).send({
            //         user,
            //         message: `company details was not found. but user was created check the company id provided`,
            //         err
            //     })
            // })
        }).catch(err => {
            return res.status(401).send({
                message: `user could not be added to DB`,
                err
            })
        })

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: `Server Error occurred`
        })
    }
}

exports.findAllUsers = async (req, res) => {
    try {
        console.log(`getting all users`);
        var users = await User.findAll({
            attributes: [`id`, [fn('CONCAT', col(`firstName`), ' ', col(`lastName`)), `Name`]]
        });
        // users = JSON.stringify(users, null, 2);
        if (users)
            return res.status(200).send({
                message: `success`,
                users
            })
        return res.status(401).send({
            message: `user could not be found`
        })
    } catch (error) {
        console.error('Unable to close the connection: ', error);
        return res.status(500).send({
            message: `Server Error occurred`
        })
    }
}

exports.findUserById = async (req, res) => {
    try {
        await User.findOne({
            attributes: ['id', [fn('CONCAT', col(`firstName`), ' ', col(`lastName`)), `Name`]],
            where: {
                id: req.params.id
            }
        }).then(async data => {
            await Address.findAll({
                where: {
                    userId: req.params.id
                }
            }).then(address => {
                return res.status(200).send({
                    message: `success`,
                    data,
                    address
                })
            })
        }).catch(err => {
            console.log(err);
            return res.status(401).send({
                message: `Requested data could not be found`,
                err
            })
        })

    } catch (error) {
        console.error(`Error while getting user details - `, error);
        return res.status(500).send({
            message: `Server Error occurred`
        })
    }
}

exports.deleteUserById = async (req, res) => {
    try {
        let user = await User.destroy({
            where: {
                id: req.params.id
            }
        })
        if (user) {
            return res.status(200).send({
                message: `success, user deleted`,
                user
            })
        }
        return res.status(400).send({
            message: `User not found. So no record deleted`
        })
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: `Server Error occurred`
        })
    }
}

exports.deleteAllUsers = async (req, res) => {
    try {
        User.drop().then(() => {
            return res.status(200).send({
                message: 'success'
            })
        })
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: `Server Error occurred`
        })
    }
}