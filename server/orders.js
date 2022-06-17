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
  verifyDish,
  getDish,
} = require("../utils/utils.js");
const { use } = require("./users.js");

// //algorithms: ["RS256"]
router.use(
  expressJwt({ secret: jwtKey, algorithms: ["HS256"] }).unless({
    path: ["/", "/signup", "/login"],
  })
);
router.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).send("You need to sign in or sign up");
  } else {
    next(err);
  }
});

router.get("/order", async (req, res) => {
  try {
    res.status(200).json("Take your order now");
  } catch (error) {
    console.error(error);
    res.status(400);
  }
});

router.post("/order", verifyDish, async (req, res) => {
  //ID, STATUS, DATE, TIME, DESCRIPTION, PAYMENT, USER
  const { name, payment } = req.body;
  const userId = req.user.payload.id;
  try {
    const date = new Date();
    console.log(date);
    const dish_id = await sequelize.query(
        "SELECT id FROM Dishes WHERE Name = :dish",
        { replacements: { dish: name} }
    )
    console.log(dish_id);
    console.log(userId);
    const makeOrder = await sequelize.query(
      "INSERT INTO orders (Status, Date, Description, Payment, User_id) VALUES (:status, :date, :description, :payment, :user_id)",
      { replacements: {
        status: "New",
        date: date,
        description: name,
        payment: payment,
        user_id: userId,
      } }
    );
    res.status(200).json("Your order has been made succesfully, you can follow it");
  } catch (error) {
    console.error(error);
    res.status(400);
  }
});

module.exports = router;
