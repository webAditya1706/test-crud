const express = require('express');
const { createUser, userLogin, allData } = require('../controllers/userController');
const userValidation = require('../validation/userValidation');
userRouter = express.Router();


userRouter.post('/create', userValidation, createUser);
userRouter.post('/login', userLogin);
userRouter.get('/all-data', allData);

module.exports = userRouter;