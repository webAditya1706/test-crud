const express = require('express');
const cors = require('cors');
const Conn = require('./mongoConn/conn');
const userRouter = require("./routes/userRouter");
const dotenv = require('dotenv');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: '*' }));
dotenv.config();
Conn();

const options = {
    swaggerDefinition: require('./swagger/swagger.json'),
    apis: [], // You can specify API routes here if needed
};
const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/user', userRouter);
app.listen(5001, () => {
    console.log('server work');
})