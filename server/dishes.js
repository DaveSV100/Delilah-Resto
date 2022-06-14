const express = require("express");
const sequelize = require("../database/connection.js");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const jwtKey = process.env.JWTKEY;
const router = express.Router();

router.use(expressJwt({ secret: jwtKey, algorithms: ["HS256"] }).unless({ path: [ "/", "/login", "/signup" ] }));

/*** GET dishes ***/
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
    
module.exports = router;