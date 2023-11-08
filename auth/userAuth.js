const jwt = require('jsonwebtoken')

const userAuth = async (req, res, next) => {
    let secretKey = process.env.JWT_SECRET_KEY
    const token = await req.headers.Authorization || await req.headers.authorization;
    try {
        const verification = await jwt.verify(token, secretKey);
        if (verification) {
            next();
        } else {
            res.status(400).send({
                status: false,
                error: 'token expired'
            })
        }
    } catch (error) {
        res.status(500).send({
            status: false,
            error
        })
    }

}

module.exports = userAuth;