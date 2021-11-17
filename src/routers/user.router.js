var express = require('express');
const userController = require('../controllers/user.controller');
var userRouter = express.Router();

userRouter.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

userRouter.get('/', (req, res) => {
    res.send({
        message: `Welcome User!`
    })
})

userRouter.post(`/create`, userController.createUser, (req, res) => {
    res.json({ res })
})

userRouter.get(`/all`, userController.findAllUsers, (req, res) => {
    res.json({ res });
})

userRouter.get(`/:id`, userController.findUserById, (req, res) => {
    res.json({ res });
})

userRouter.delete(`/delete/:id`, userController.deleteUserById, (req, res) => {
    res.json({ res });
})

userRouter.delete('/all', userController.deleteAllUsers, (req,res) => {
    res.json({res});
})

module.exports = userRouter;