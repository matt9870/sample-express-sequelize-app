const app = require('./src/app');
const sequelize = require('./src/config/db.config');
const addressModel = require('./src/models/address.model');
const { applyAssociation } = require('./src/models/association');
const companyModel = require('./src/models/company.model');
const userModel = require('./src/models/user.model');

const port = process.env.PORT || 3000;

async function init() {
  try {
    await sequelize.authenticate().then(async () => {
      applyAssociation();

      //Uncomment the following line to apply the additions/changes to models and associations
      
      await sequelize.sync({ alter: true }).then(() => {
      console.log('Connection has been established successfully. Sequelize has been synced');
      })
    })
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

init().then(() => {
  app.listen(port, () => {
    console.log(`Sample app listening at http://localhost:${port}`);
    console.log(`Swagger docs online at http://localhost:${port}/api-docs`);
  })
})

