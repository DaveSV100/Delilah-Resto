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
    getID
  } = require("../utils/utils");

// //algorithms: ["RS256"]
router.use(expressJwt({ secret: jwtKey, algorithms: ["HS256"] }).unless({ path: ["/", "/signup", "/login"] }));
router.use(function (err, req, res, next) {
    if (err.name === "UnauthorizedError") {
        res.status(401).send("You need to sign in or sign up");
    } else {
        next(err);
    }
})

router.get("/users", checkAdmin, async (req, res) => {
    try {
        const records = await sequelize.query("SELECT * FROM usuarios", { type: sequelize.QueryTypes.SELECT })
        res.status(200).json(records);
    } catch (error) {
        console.error(error);
    }      
  });
router.get("/users:id", checkAdmin, async (req, res) => {
    const id = req.params.id;
    if (req.params.id != null) {
        try {
            const records = await sequelize.query("SELECT * FROM usuarios WHERE id = ?", { replacements: {id: id}, type: sequelize.QueryTypes.SELECT })
            res.status(200).json(records);
        } catch (error) {
            console.error(error);
        }   
    }
})
router.post("/login", verifyUser, async (req, res) => {
    const email = req.body.email;
    try {
        const data = await sequelize.query("SELECT * FROM usuarios WHERE email = ?", {replacements: [req.body.email], type: sequelize.QueryTypes.SELECT,})
        console.log(data[0].Admin);
        console.log(data[0].Name);
        console.log(data[0].id);
        // const user = req.body;
        const username = data[0].Name;
        const admin = data[0].Admin;
        const id = data[0].id;
        const payload = {
            user: username,
            role: admin,
            id: id
        }
        const token = jwt.sign({payload}, jwtKey, { expiresIn: "1h" });
        res.status(200).json({
            token
        });
        console.log(token);
    } catch (error) {
        console.error(error);
    }
});
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
router.put("/modifyuser", verifyUser, async(req, res) => {
    if(req.user.payload.role == 1 ) {
        //Admins can make changes over any user by providing an email
        const { name, email, password, direction, admin } = req.body;
        try {
            //The next const calls the function GETID in order to get the id of the user desired. It will use the email to make the query and find the id.
            const user_id = await getID(req.body.email);
            const update = await sequelize.query(
                "UPDATE usuarios SET name = :name, email = :email, password = :password, direction = :direction, admin = :admin WHERE id = :id",
                { replacements: {name, email, password, direction, admin, id: user_id} }
            )
            res.status(200).json(`User updated corrrectly`);
        } catch (error) {
            console.error(error);
            res.status(400);
        }
    } else  {
        const { name, email, password, direction } = req.body;
        try {
            //Those who are not admins can only make changes in their own ID not in the id of others. The id is taken from the "payload" which was created when the token was generated.
            const user_id = await req.user.payload.id;
            const update = await sequelize.query(
                "UPDATE usuarios SET name = :name, email = :email, password = :password, direction = :direction WHERE id = :id",
                { replacements: {name, email, password, direction, id: user_id} }
            )
            res.status(200).json(`User updated corrrectly`);
        } catch (error) {
            console.error(error);
            res.status(400);
        }
    }
    
})
router.delete("/deleteuser", verifyUser, async(req, res) => {
    if(req.user.payload.role == 1 ) {
        try {
            //The next const calls the function GETID in order to get the id of the user desired. It will use the email to make the query and find the id.
            const user_id = await getID(req.body.email);
            const deleteUser = await sequelize.query(
                "DELETE FROM usuarios WHERE id = :id",
                { replacements: {id: user_id} }
            )
            res.status(200).json("User removed");
        } catch (error) {
            console.error(error);
            res.status(400);
        }
    } else {
        try {
            //Those who are not admins can only make changes in their own ID not in the id of others. The id is taken from the "payload" which was created when the token was generated.
            const user_id = await req.user.payload.id;
            const deleteUser = await sequelize.query(
                "DELETE FROM usuarios WHERE id = :id",
                { replacements: {id: user_id} }
            )
            res.status(200).json("User removed");
        } catch(error) {
            console.error(error);
            res.status(400);
        }
    }
})

//Export routes
module.exports = router;