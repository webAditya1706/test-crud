const userSchema = require("../model/user");
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {

    try {
        const validationError = await validationResult(req);
        const { name, email, password } = req.body;
        const document = await req.file.filename
        console.log(document, "------------document");
        const user = await userSchema({ name, email, password, document });
        const IsExist = await userSchema.findOne({ email });
        if (validationError?.errors?.length > 0) {
            res.status(402).json({
                status: false,
                message: validationError.errors
            })
        } else {
            if (IsExist) {
                res.status(400).json({
                    status: false,
                    message: "This mail already used"
                })
            } else {
                if (user) {
                    let saltRound = 5;
                    let hashPass = await bcrypt.hash(password, saltRound);
                    user.password = hashPass;
                    await user.save()
                    res.status(200).json({
                        status: true,
                        message: "user created"
                    })
                } else {
                    res.status(204).json({
                        status: false,
                        message: "some thing went wrong"
                    })
                }
            }

        }
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}

const userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const logData = await userSchema.findOne({ email });
        if (logData) {
            const comPass = await bcrypt.compare(password, logData.password);
            let secretKey = process.env.JWT_SECRET_KEY
            const token = jwt.sign({ _id: logData._id }, secretKey)
            if (comPass && token) {
                res.status(200).json({
                    status: true,
                    token,
                    user: logData
                })
            }
            res.status(400).json({
                status: false,
                message: "Incorrect email or password"
            })
        } else {
            res.status(404).json({
                status: false,
                message: "Incorrect email or password"
            })
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }

}

const allData = async (req, res) => {
    const data = await userSchema.find();
    console.log('all data');
    try {
        if (data) {
            res.status(200).json({
                status: true,
                message: data
            })
        } else {
            res.status(400).json({
                status: false,
                message: "something went wrong"
            })
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}

module.exports = { createUser, userLogin, allData }