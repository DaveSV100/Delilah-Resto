const express = require("express");
const sequelize = require("../database/connection.js");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const jwtKey = process.env.JWTKEY;
const router = express.Router();

//algorithms: ["RS256"]
// router.use(expressJwt({ secret: jwtKey, algorithms: ["HS256"] }).unless({ path: ["/", "/login"] }));

//Loging with username and password
// sequelize.query('INSERT INTO`restaurant`(`ID_USER`, `NOM_RESTO`, `ADRESSE`) VALUES(?, ?, ?)',
//         { replacements: array_insert, type: sequelize.QueryTypes.SELECT }
//Middleware to check if the user already exists
const verifyUser = (req, res, next) => {
    if(req.body.name && req.body.password != "") {
        sequelize.query("SELECT * FROM usuarios WHERE name = ? && password = ?", { replacements: [req.body.name, req.body.password], type: sequelize.QueryTypes.SELECT, })
        .then((records) => {
            //This if statment verifies whether there's data or not
            if (records[0]) {
                next();
            } else if (records[0] == null) {
                res.status(404).send("User not found :V")
            }
        })
    } else {
        res.status(404).send("You need to insert your name and password");
    }
}
router.post("/", verifyUser, (req, res) => {
  const username = req.body.name;
  sequelize.query("SELECT * FROM usuarios WHERE name = ?", {replacements: [req.body.name],type: sequelize.QueryTypes.SELECT,})
  .then(function (records) {
        const token = jwt.sign({
            user: username
        }, jwtKey, { expiresIn: "1h" },);
        res.status(200).json({
            token
        });
        console.log(token);
    });
});

// const verifyToken = (req, res, next) => {
//     const bearerHeader = req.headers["authorization"];
//     if(typeof bearerHeader !== "undefined") {
//         const bearer = bearerHeader.split(" ");
//         const bearerToken = bearer[1];
//         req.token = bearerToken;
//         next();
//     } else {
//         res.status(403).send("You're not a user, you need to sign up");
//     }
// }

router.get("/", (req, res) => {
    // jwt.verify(req.token, jwtKey);
  if (req.query.name != null) {
    sequelize
      .query("SELECT * FROM usuarios WHERE name = ?", {
        replacements: [req.query.name],
        type: sequelize.QueryTypes.SELECT,
      })
      .then(function (records) {
        res.status(200).send(JSON.stringify(records, null, 2));
      });
  } else {
    sequelize
      .query("SELECT * FROM usuarios", { type: sequelize.QueryTypes.SELECT })
      .then(function (records) {
        res.status(200).send(JSON.stringify(records, null, 2));
      });
  }
});

module.exports = router;