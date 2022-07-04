const Sequelize = require("sequelize");
const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_NAME
} = require("../utils/config.js");
// const path = `mysql://root:delilah10@127.0.0.1:3306/Delilah`;
const path = `mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
const sequelize = new Sequelize(path, { operatorsAliases: false });
sequelize.authenticate().then(() => {
    console.log("Connected to Database");
}).catch(err => {
    console.error("Connection not stablished", err);
})

module.exports = sequelize;