const express = require("express");
const sequelize = require("../database/connection.js");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const jwtKey = process.env.JWTKEY;
const router = express.Router();

// router.use(expressJwt({ secret: jwtKey, algorithms: ["HS256"] }).unless({ path: [ "/", "/login", "/signup" ] }));
//Middleware to verify if user is admin
const jwtVerification = async(req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    try {
        
        const verification = jwt.verify(token, jwtKey);
        // console.log(verification.payload.admin)
        req.data = verification;
        next()
    } catch(error) {
        console.error(error)
    }
}
const isAdmin = async(req, res, next) => {
    // const tokenData = req.headers.authorization;
    // console.log(tokenData)
    try {
        const admin = req.data.payload.role;
        console.log(`admin =>>> ${admin}`);
        if(admin == 1) {
            next();
        } else {
            res.status(403).json("Sorry, only admins can access")
        }
    } catch(error) {
        console.error(error);
    }
}
/*** GET dishes ***/
router.get("/dishes", jwtVerification, async (req, res) => {
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

/*** POST dishes ***/
router.post("/dishes", async (req, res) => {
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
//Verify Dish
const verifyDish = async (req, res, next) => {
    if(req.body.name != null) {
        try {
            const records = await sequelize.query("SELECT * FROM dishes WHERE name = ?", { replacements: [req.body.name], type: sequelize.QueryTypes.SELECT})
            if(records[0]) {
                next();
            } else if (records[0] == null) {
                res.status(404).send("Dish not found :v");
            }
        } catch(error) {
            console.error(error);
        }
    } else {
        res.status(404).json("You need to insert the name of the dish")
    }
}
// Function to get the dish data
const getDish = async(name) => {
    const product = await sequelize.query(
        "SELECT id FROM dishes WHERE name = ?", { replacements: [name], type: sequelize.QueryTypes.SELECT, }
    )
    const productID = product[0].id;
    console.log(product)
    return productID;
}
/*** PUT (update) a dish ***/
router.put("/dishes", verifyDish, jwtVerification, isAdmin, async (req, res) => {
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

/**DELETE**/
router.delete("/deletedish", verifyDish, async(req, res) => {
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