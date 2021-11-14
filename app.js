const sequelize = require('./src/config/db.config');
const express = require('express');
const userRouter = require('./src/routers/user.router');
const addressRouter = require('./src/routers/address.router');
// const association = require('./src/models/association');

const app = express();
const port = process.env.PORT || 3000;

const {user, address} = sequelize.models;

app.get('/', (req, res) => {
  res.send('Greetings Human!');
})

app.use(express.json());
app.use(`/users`, userRouter);
app.use(`/address`, addressRouter);

const User = require('./src/models/user.model');
const Address = require('./src/models/address.model');


// User.sync();
// Address.sync();

async function ConnectToDB() {
  try {
    await sequelize.authenticate().then(async () => {
      await User.sync({ alter: true }).then(async () => {
        await Address.sync().then(() => {
          console.log('Connection has been established successfully. Sequelize has been synced');
        })
      })
      // await sequelize.sync({alter:true}).then(() => {
      //   console.log('Connection has been established successfully. Sequelize has been synced');
      // })
    })
    // await User.drop();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
ConnectToDB();

app.listen(port, () => {
  console.log(`Sample app listening at http://localhost:${port}`);
})