const Sequelize = require("sequelize");
const path = "mysql://root@127.0.0.1:3306/Restaurant";
const sequelize = new Sequelize(path, { operatorsAliases: false });

sequelize.authenticate().then(() => {
    console.log("Connected");
}).catch(err => {
    console.error("Connection not stablished", err);
}).finally(() => {
    sequelize.close();
});

module.exports = sequelize;