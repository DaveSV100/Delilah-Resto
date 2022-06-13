const express = require("express");
const sequelize = require("../database/connection.js");
const jwt = require("jsonwebtoken");
// const expressJwt = require("express-jwt");
const jwtKey = process.env.JWTKEY;
const router = express.Router();

//algorithms: ["RS256"]
// router.use(expressJwt({ secret: jwtKey, algorithms: ["HS256"] }).unless({ path: ["/", "/login"] }));

//Loging with username and password
// sequelize.query('INSERT INTO`restaurant`(`ID_USER`, `NOM_RESTO`, `ADRESSE`) VALUES(?, ?, ?)',
//         { replacements: array_insert, type: sequelize.QueryTypes.SELECT }


//Middleware for "/login" to check if the user already exists
const verifyUser = async (req, res, next) => {
    if(req.body.email && req.body.password != "") {
        try {
            const records = await sequelize.query("SELECT * FROM usuarios WHERE email = ? && password = ?", { replacements: [req.body.email, req.body.password], type: sequelize.QueryTypes.SELECT, })
            //This if statment verifies whether there's data or not
            if (records[0]) {
                next();
            } else if (records[0] == null) {
                res.status(404).send("User not found :V")
            }
        } catch (error) {
            console.error(error);
        }
    } else {
        res.status(404).send("You need to insert your name and password");
    }
}
//**LOGIN**
router.post("/login", verifyUser, async (req, res) => {
    const email = req.body.email;
    try {
        await sequelize.query("SELECT * FROM usuarios WHERE email = ?", {replacements: [req.body.email],type: sequelize.QueryTypes.SELECT,})
        const token = jwt.sign({
            email: email
        }, jwtKey, { expiresIn: "1h" },);
        res.status(200).json({
            token
        });
        console.log(token);
    } catch (error) {
        console.error(error);
    }
});

//Middleware for "/signup" to verify if user already exists 
const existingUser = async (req, res, next) => {
    if(req.body.name && req.body.email != "") {
        try {
            const records = await sequelize.query("SELECT * FROM usuarios WHERE name = ? && email = ?", { replacements: [req.body.name, req.body.email], type: sequelize.QueryTypes.SELECT, })
            //This if statment verifies whether there's data or not
            if (records[0]) {
                res.status(409).json("You are already a user and need to sign in");
            } else if (records[0] == null) {
                next();
            }
        } catch (error) {
            console.error(error);
        }
    } else {
        res.status(404).send("You need to insert the data required");
    }
}

//**SIGN UP**
router.post("/signup", existingUser, async (req, res) => {
    const { name, email, password, direction } = req.body;
    try {
        if (name && email && password && direction) {
            const add = await sequelize.query(
                "INSERT INTO usuarios (Name, Email, Password, Direction) VALUES (:name, :email, :password, :direction)",
                { replacements: {name, email, password, direction } }
            )
            res.status(200).json("User added");
        } else {
            res.status(400);
        }
    } catch (error) {
        console.error(error);
    }
});


//Simple login with get endpoint to test if JWT Key is working
// router.get("/login", (req, res) => {
//     // jwt.verify(req.token, jwtKey);
//   if (req.query.name != null) {
//     sequelize
//       .query("SELECT * FROM usuarios WHERE name = ?", {
//         replacements: [req.query.name],
//         type: sequelize.QueryTypes.SELECT,
//       })
//       .then(function (records) {
//         res.status(200).send(JSON.stringify(records, null, 2));
//       });
//   } else {
//     sequelize
//       .query("SELECT * FROM usuarios", { type: sequelize.QueryTypes.SELECT })
//       .then(function (records) {
//         res.status(200).send(JSON.stringify(records, null, 2));
//       });
//   }
// });


//Export routes
module.exports = router;