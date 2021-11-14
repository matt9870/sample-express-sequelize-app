// const User = require('../models/user.model');
const {user} = sequelize.models;
const { Op, fn, col } = require('sequelize');
const sequelize = require('../config/db.config');
// const Address = require('../models/address.model');

exports.createUser = async (req, res) => {
    try {
        if(!req.body){
            return res.status(401).send({
                message: `New user details need to be provided`,
                body: req.body
            })
        }
        let userData = req.body;
        let user = await User.create({
            firstName: userData.firstName,
            lastName: userData.lastName,
            dateOfBirth: userData.dateOfBirth
        })
        if(user){
            return res.status(200).send({
                message:`success`,
                user
            })
        }
        return res.status(401).send({
            message: `user could not be built`
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
        var users = await User.findAll({
            attributes: [`id`, [fn('CONCAT', col(`firstName`), ' ', col(`lastName`)), `Name`]]
        });
        // users = JSON.stringify(users, null, 2);
        if(users)
        return res.status(200).send({
            message: `success`,
            users
        })
        return res.status(401).send({
            message: `user could not be found`
        })
    } catch (error) {
        console.error('Unable to close the connection: ', error);
    }
}

exports.findUserById = async (req, res) => {
    try {
        await User.findOne({
            attributes: ['id', [fn('CONCAT', col(`firstName`), ' ', col(`lastName`)), `Name`]],
            where: {
                id: req.params.id
            },
            include:[{
                model: Address,
                as: 'address'
            }]
        }).then(data=>{
            return res.status(200).send({
                message: `success`,
                data
            })
        }).catch(err =>{
            console.log(err);
            return res.status(401).send({
                message: `Requested data could not be found`,
                err
            })
        })
        
    } catch (error) {
        console.error(`Error while getting user details - `, error);
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