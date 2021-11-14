// const Address = require("../models/address.model");
// const User = require('../models/user.model');

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
        }
        // ,{
        //     include:[{
        //         association: User,
        //     }]
        // }
        ).then(async savedAddress => {
            await User.update({ addressId: savedAddress.id }, {
                where: {
                    id: user.id
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