const express = require("express");
const sequelize = require("../database/connection.js");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const jwtKey = process.env.JWTKEY;
const router = express.Router();
const {
    checkAdmin,
    verifyUser,
    existingUser,
    verifyData,
    getID
  } = require("../utils/utils");

router.use(expressJwt({ secret: jwtKey, algorithms: ["HS256"] }).unless({ path: ["/", "/users/signup", "/users/login"] }));
router.use(function (err, req, res, next) {
    if (err.name === "UnauthorizedError") {
        res.status(401).send("You need to sign in or sign up");
    } else {
        next(err);
    }
})

router.get("/users", checkAdmin, async (req, res) => {
    try {
        const records = await sequelize.query("SELECT * FROM users", { type: sequelize.QueryTypes.SELECT })
        res.status(200).json(records);
    } catch (error) {
        res.status(400).json(`Error message: ${error}`)
        console.error(error);
    }      
  });
router.get("/users/:id", checkAdmin, async (req, res) => {
        const user_id = req.params.id;
            try {
                const records = await sequelize.query("SELECT * FROM users WHERE id = :id", { replacements: {id: user_id}, type: sequelize.QueryTypes.SELECT })
                if(records.length == 0) {
                    res.status(404).json("ID doesn't exist")
                } else {
                    res.status(200).json(records)
                }
            } catch (error) {
                console.error(error);
                res.status(400).json(`Error message: ${error}` );
            }   
})
router.post("/users/signup", existingUser, async (req, res) => {
    const { name, email, password, direction } = req.body;
    try {
        if (name && email && password && direction) {
            const add = await sequelize.query(
                "INSERT INTO users (Name, Email, Password, Direction) VALUES (:name, :email, :password, :direction)",
                { replacements: {name, email, password, direction } }
            )
            res.status(200).json("Your account was created, now you can sign in to see our menu");
        } else {
            res.status(400).json("Error message: You need to insert the data required" );
        }
    } catch (error) {
        res.status(400).json("Error message: " + error)
        console.error(error);
    }
});
router.post("/users/login", verifyUser, async (req, res) => {
    const email = req.body.email;
    try {
        const data = await sequelize.query("SELECT * FROM users WHERE email = ?", {replacements: [req.body.email], type: sequelize.QueryTypes.SELECT,})
        const username = data[0].Name;
        const admin = data[0].Admin;
        const id = data[0].ID;
        const payload = {
            user: username,
            role: admin,
            id: id
        }
        console.log(payload);
        const token = jwt.sign({payload}, jwtKey, { expiresIn: "1h" });
        res.status(200).json({Message: `You're welcome ${username}`, Token: token});
        console.log(token);
    } catch (error) {
        res.status(400).json("Error message: " + error);
        console.error(error);
    }
});
router.put("/users/:id", checkAdmin, async(req, res) => {
    //Admins can make changes over any user by providing the id
    const user_id = req.params.id;
    const { name, email, direction, admin } = req.body;
    try {
        const update = await sequelize.query(
            "UPDATE users SET name = :name, email = :email, direction = :direction, admin = :admin WHERE id = :id",
            { replacements: { name, email, direction, admin, id: user_id } }
        )
        if(update[0].changedRows == 0) {
            res.status(404).json("ID doesn't exist")
        } else {
            res.status(200).json(`User updated correctly`);
        }
    } catch (error) {
        console.error(error);
        res.status(400).json("Error message: " + error);
    }
})
router.delete("/users/:id", checkAdmin, async(req, res) => {
    try {
        const user_id = req.params.id;
        const deleteUser = await sequelize.query(
            "DELETE FROM users WHERE id = :id",
            { replacements: {id: user_id} }
        )
        if(deleteUser[0].affectedRows == 0) {
            res.status(404).json("ID doesn't exist")
        } else {
            res.status(200).json(`User removed correctly`);
        }
    } catch (error) {
        console.error(error);
        res.status(400).json("Error: " + error);
    }
})
module.exports = router;