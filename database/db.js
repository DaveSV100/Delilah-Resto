// const { response } = require("express");
const express = require("express");
// const { Sequelize } = require("sequelize/types");
const app = express();
const sequelize = require("./connection.js");


// const search = async () => {
//     sequelize.query("SELECT * FROM usuarios", { type: sequelize.QueryTypes.SELECT })
//         .then(function (users) {
//             console.log(users);
//         })
// }

// search();


app.get("/usuarios", (req, res) => {
    if(req.query.name != null) {
        sequelize.query('SELECT * FROM usuarios WHERE name = ?', { replacements: [req.query.name], type: sequelize.QueryTypes.SELECT })
        .then(function(records) {
            res.status(200).send(JSON.stringify(records, null, 2));
        })
    } else {
        sequelize.query('SELECT * FROM usuarios', { type: sequelize.QueryTypes.SELECT })
        .then(function(records) {
            res.status(200).send(JSON.stringify(records, null, 2));
        })
    }
});

app.post("/usuarios", (req, res) => {
    // sequelize.query('INSERT INTO`restaurant`(`ID_USER`, `NOM_RESTO`, `ADRESSE`) VALUES(?, ?, ?)',
    //     { replacements: array_insert, type: sequelize.QueryTypes.SELECT }
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const direction = req.body.direction;
    console.log(name);
    sequelize.query('INSERT INTO `usuarios` (`name`, `email`, `password`, `direction`) VALUES(?, ?, ?, ?)', 
    { replacements: name, email, password, direction, type: sequelize.QueryTypes.SELECT })
})

app.use(function(req, res, next) {
    globalres = {
        error: true,
        codigo: 404,
        mensaje: "URL not found"
    };
    res.status(404).send(globalres);
});

app.listen(3001, () => {
    console.log("Server running at port 3001");
})
