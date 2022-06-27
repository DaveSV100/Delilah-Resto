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
  getOrder
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

router.get("/order/list", checkAdmin, async (req, res) => {
  try {
    const records = await sequelize.query(
      //"SELECT Orders.ID, Orders.Status, Orders.Date, Orders.Description, Orders.Payment, users.name, users.email, users.direction, users.admin FROM Orders INNER JOIN users ON Orders.User_id = users.id ORDER BY date ASC", { type: sequelize.QueryTypes.SELECT }
      //"SELECT * FROM Orders INNER JOIN dishes ON Orders.Dish_id = dishes.id INNER JOIN users ON Orders.User_id = users.id", { type: sequelize.QueryTypes.SELECT }
      "SELECT Orders.status, Dishes.Image, users.Name FROM Orders INNER JOIN orders_dishes ON Orders.ID = Orders_dishes.Order_id INNER JOIN Dishes ON Orders_dishes.Dish_id = Dishes.id INNER JOIN users ON Orders.User_id = users.id"
      )
    records ? res.status(200).json(records) : res.status(404);
  } catch (error) {
    console.error(error);
  }
})

router.post("/order", async (req, res) => {
  //ID, STATUS, DATE, TIME, DESCRIPTION, PAYMENT, USER
  const { description, payment } = req.body;
  const userId = req.user.payload.id;

  try {
    const date = new Date();
    console.log(date);
    description.forEach(async(element) => {
      const dishId = await getDish(element);
      console.log(dishId)
      const makeOrder = await sequelize.query(
        "INSERT INTO orders (Status, Date, Dish_id, User_id, Payment) VALUES (:status, :date, :dish_id, :user_id, :payment)",
        { replacements: {
          status: "New",
          date: date,
          dish_id: dishId,
          user_id: userId,
          payment: payment,
        } }
      );
      const orderId = await getOrder(dishId, userId);
  
      const insertData = await sequelize.query(
        "INSERT INTO Orders_dishes (Order_id, Dish_id) VALUES (:order_id, :dish_id)",
        {
          replacements: {
            order_id: orderId,
            dish_id: dishId,
          }
        }
      )
    });
    res.status(200).json("Your order has been made succesfully, you can follow it");
   
    // const date = new Date();
    // console.log(date);
    // const dishId = await getDish(description);
    // const makeOrder = await sequelize.query(
    //   "INSERT INTO orders (Status, Date, Dish_id, User_id, Payment) VALUES (:status, :date, :dish_id, :user_id, :payment)",
    //   { replacements: {
    //     status: "New",
    //     date: date,
    //     dish_id: dishId,
    //     user_id: userId,
    //     payment: payment,
    //   } }
    // );
    // const orderId = await getOrder(dishId, userId);

    // const insertData = await sequelize.query(
    //   "INSERT INTO Orders_dishes (Order_id, Dish_id) VALUES (:order_id, :dish_id)",
    //   {
    //     replacements: {
    //       order_id: orderId,
    //       dish_id: dishId,
    //     }
    //   }
    // )

    // res.status(200).json("Your order has been made succesfully, you can follow it");
  } catch (error) {
    console.error(error);
    res.status(400);
  }
});

router.put("/order", checkAdmin, async (req, res) => {
  const { new_status, orderID } = req.body;
  const order_status = ["New", "Confirmed", "Preparing", "Delivering", "Cancelled", "Delivered"];
  if(order_status.includes(new_status)) {
    try {
      const updateDish = await sequelize.query(
        "UPDATE Orders SET status = :status WHERE id = :id",
        { replacements: {status: new_status, id: orderID} }
    )
      res.status(200).json(`The order ${orderID} is now updated as: ${new_status}.`);
    } catch(error) {
      console.error(error);
      res.status(404);
    }
  } else {
    res.status(404).json("Status not found");
  }
})

router.delete("/order", checkAdmin, async (req, res) => {
  try {
    const orderID = req.body.orderID;
    const deleteOrder = await sequelize.query(
      "DELETE FROM Orders WHERE id = :id",
      { replacements: {id: orderID} }
    )
    res.status(200).json("Order deleated successfully");
  } catch(error) {
    console.error(error);
  }
})

module.exports = router;