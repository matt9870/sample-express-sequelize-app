const sequelize = require('./src/config/db.config');
const express = require('express');
const { applyAssociation } = require('./src/models/association');


const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Greetings Human!');
})

app.use(express.json());

const userRouter = require('./src/routers/user.router');
const addressRouter = require('./src/routers/address.router');
const companyRouter = require('./src/routers/company.router');
app.use(`/users`, userRouter);
app.use(`/address`, addressRouter);
app.use(`/company`, companyRouter);
const swaggerUi = require("swagger-ui-express");
const path = require('path');

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(require(path.resolve(`${__dirname}/swagger/swagger.json`)))
);

async function init() {
  try {
    await sequelize.authenticate().then(async () => {
      applyAssociation();

      //Uncomment the following line to apply the additions/changes to models and associations
      
      // await sequelize.sync({ alter: true }).then(() => {
      console.log('Connection has been established successfully. Sequelize has been synced');
      // })
    })
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

init().then(() => {
  app.listen(port, () => {
    console.log(`Sample app listening at http://localhost:${port}`);
  })
})

