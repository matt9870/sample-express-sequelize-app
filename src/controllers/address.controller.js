const Address = require("../models/address.model");
const User = require('../models/user.model');
// const { models } = require('../config/db.config');


exports.createAddress = async (req, res) => {
    try {
        // console.log(req.body);
        if (!req.body) {
            return res.status(401).send({
                message: `New address details need to be provided`,
                body: req.body
            })
        }
        let user = await User.findByPk(req.body.userId);
        if (!user)
            return res.status(400).send({
                message: `User not found`
            })
        let newAddress = req.body;
        await Address.create({
            houseNumber: newAddress.houseNumber,
            city: newAddress.city,
            state: newAddress.state,
            countryCode: newAddress.countryCode,
            userId: newAddress.userId
        }, {
            include: [User]
        }).then(async savedAddress => {
            return res.status(200).send({
                message: `sucess saving the address and id to user`,
                savedAddress
            })
            await user.update({ addressId: savedAddress.id }, {
                where: {
                    id: newAddress.userId
                }
            }).then(user => {
                return res.status(200).send({
                    message: `sucess saving the address and id to user`,
                    savedAddress,
                    user
                })
            }).catch(err => {
                console.error(err);
                return res.status(500).send({
                    message: `Server Error occurred while address to user`
                })
            })
        }).catch(err => {
            console.error(err);
            return res.status(500).send({
                message: `Server Error occurred while creating address`
            })
        })
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: `Server Error occurred`
        })
    }
}

exports.deleteAddressById = async (req, res) => {
    try {
        if (await Address.findByPk(req.params.id))
            await Address.destroy({
                where: {
                    id: req.params.id
                }
            }).then(data => {
                return res.status(200).send({
                    message: `success`,
                    data
                })
            })
        return res.status(401).send({
            message: `Requested data could not be found`
        })
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: `Server Error occurred`
        })
    }
}

exports.getAddressById = async (req, res) => {
    try {
        console.log(`getting address in ${req.params.id}`);
        await Address.findByPk(req.params.id, {
            include: [User]
        }).then(data => {
            return res.status(200).send({
                message: `success`,
                data
            })
        }).catch(err => {
            console.log(err);
            return res.status(401).send({
                message: `Requested data could not be found`,
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


exports.getAllAddresses = async (req, res) => {
    try {
        await Address.findAll({
            attributes: ['houseNumber', 'city', 'state', 'countryCode'],
            include: [{
                model: User,
                attributes: [['firstName', 'name']],
                required: true,
                right: true
            }]
        }).then(async data => {
                return res.status(200).send({
                    message: `success`,
                    data
            })
        }).catch(err => {
            console.error(err);
            return res.status(401).send({
                message: `Requested data could not be found`,
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