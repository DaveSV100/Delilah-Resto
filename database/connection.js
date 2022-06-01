const Sequelize = require("sequelize");
// const express = require("express");
// const app = express();
const path = "mysql://root@127.0.0.1:3306/Delilah";
const sequelize = new Sequelize(path, { operatorsAliases: false });
sequelize.authenticate().then(() => {
    console.log("Connected to Database");
}).catch(err => {
    console.error("Connection not stablished", err);
})
// app.get("/usuarios", (req, res) => {
//     sequelize.query('SELECT * FROM usuarios', { type: sequelize.QueryTypes.SELECT })
//     .then(function(records) {
//         res.status(200).send(JSON.stringify(records, null, 2));
//     })
//     // response = {
//     //     records: "Registro de usuarios",
//     // };
//     // res.status(200).send(response);
// });
// app.listen(3000, () => {
//     console.log("Server running at port 3000");
// })

module.exports = sequelize;