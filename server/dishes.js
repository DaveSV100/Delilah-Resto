const express = require("express");
const sequelize = require("../database/connection.js");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const jwtKey = process.env.JWTKEY;
const router = express.Router();
const {
    checkAdmin,
    verifyDish,
    getDish
} = require("../utils/utils.js");

router.use(expressJwt({ secret: jwtKey, algorithms: ["HS256"] }).unless({ path: [ "/", "/login", "/signup" ] }));
router.use(function (err, req, res, next) {
    if (err.name === "UnauthorizedError") {
        res.status(401).send("You need to sign in or sign up");
    } else {
        next(err);
    }
})


router.get("/dishes", async (req, res) => {
    try {
        const records = await sequelize.query(
            "SELECT * FROM dishes", { type: sequelize.QueryTypes.SELECT }
            )
            if(records) {
                res.status(200).json(records);
            } else {
                res.status(404).json("There's no data")
            }
        } catch (error) {
            console.error(error);
        }
})
router.post("/dishes", checkAdmin, async (req, res) => {
    const { name, image, price } = req.body;
    try {
        if (name && image && price) {
            const newProduct = await sequelize.query(
                "INSERT INTO dishes (Name, Image, Price) VALUES (:name, :image, :price)",
                { replacements: { name, image, price } }
            )
            res.status(200).json("New dish added correctly");
        } else {
            res.status(400).json("You need to insert all the data required");
        }
    } catch(error) {
        console.error(error);
    }
})
router.put("/dishes", verifyDish, checkAdmin, async (req, res) => {
    const { name, image, price } = req.body;
    try {
        const dishID = await getDish(req.body.name);
        if(dishID != "") {
            const updateDish = await sequelize.query(
                "UPDATE dishes SET name = :name, image = :image, price = :price WHERE id = :id",
                { replacements: {name, image, price, id: dishID} }
            )
            res.status(200).json("Dish updated");
        } else {
            res.status(404)
        }
    } catch(error) {
        console.error(error);
    }
})
router.delete("/deletedish", verifyDish, checkAdmin, async(req, res) => {
    try {
        const dishID = await getDish(req.body.name);
        const deleteDish = await sequelize.query(
            "DELETE FROM dishes WHERE id = :id",
            { replacements: {id: dishID} }
        )
        res.status(200).json("Dish removed");
    } catch(error) {
        console.error(error);
    }
})
module.exports = router;