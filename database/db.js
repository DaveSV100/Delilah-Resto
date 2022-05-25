// const { response } = require("express");
const express = require("express");
const app = express();
const sequelize = require("./connection.js");


// const search = async () => {
//     sequelize.query("SELECT * FROM users", { type: sequelize.QueryTypes.SELECT })
//         .then(function (users) {
//             console.log(users);
//         })
// }

// search();

app.listen(3000, () => {
    console.log("Server running at port 3000");
})

app.get("/platillos", (req, res) => {
    response = {
        records: "Registro de platillos",
    };
    res.status(200).send(response);
});

app.use(function(req, res, next) {
    respuesta = {
        error: true,
        codigo: 404,
        mensaje: "URL not found"
    };
    res.status(404).send(respuesta);
});
