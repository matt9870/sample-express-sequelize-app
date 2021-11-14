var express = require('express');
const addressController = require('../controllers/address.controller');
var addressRouter = express.Router();

addressRouter.post(`/create`, addressController.createAddress, (req, res) => {
    res.json({ res })
})

// addressRouter.get(`/:id`, addressController.getAddressById, (req, res) => {
//     res.json({ res })
// })

module.exports = addressRouter;