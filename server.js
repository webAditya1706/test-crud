const express = require('express');
const cors = require('cors');
const Conn = require('./mongoConn/conn');
const userRouter = require("./routes/userRouter");
const dotenv = require('dotenv')

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: '*' }));
dotenv.config();
Conn();
// app.use('/user', (req, res) => {
//     res.send('This is main route')
// })
app.use('/user',userRouter)
app.listen(5001, () => {
    console.log('server work');
})