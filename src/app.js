const express = require('express');
const swaggerUi = require("swagger-ui-express");
const path = require('path');

// require('dotenv').config();

const app = express();

app.get('/', (req, res) => {
  res.send('Greetings Human!');
})

app.use(express.json());

const userRouter = require('./routers/user.router');
const addressRouter = require('./routers/address.router');
const companyRouter = require('./routers/company.router');
app.use(`/users`, userRouter);
app.use(`/address`, addressRouter);
app.use(`/company`, companyRouter);


app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(require(path.resolve(`${__dirname}/swagger/swagger.json`)))
);

module.exports = app;