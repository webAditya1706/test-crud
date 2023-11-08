const express = require('express');
const { createUser, userLogin, allData } = require('../controllers/userController');
const userValidation = require('../validation/userValidation');
const userAuth = require('../auth/userAuth');
const uploadImages = require('../auth/uploadImages');
userRouter = express.Router();


userRouter.post('/create',uploadImages.single('document'), userValidation, createUser);
userRouter.post('/login', userLogin);
userRouter.get('/all-data',userAuth, allData);

module.exports = userRouter;