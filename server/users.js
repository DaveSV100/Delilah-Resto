const express = require("express");
const sequelize = require("../database/connection.js");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const jwtKey = process.env.JWTKEY;
const router = express.Router();
const {
    checkAdmin,
    verifyUser,
    verifyUserId,
    existingUser,
    getID
  } = require("../utils/utils");

// //algorithms: ["RS256"]
router.use(expressJwt({ secret: jwtKey, algorithms: ["HS256"] }).unless({ path: ["/", "/signup", "/users/login"] }));
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
        if(req.params.id != null) {
            try {
                const records = await sequelize.query("SELECT * FROM users WHERE id = :id", { replacements: {id: user_id}, type: sequelize.QueryTypes.SELECT })
                console.log(records)
                if(records.length == 0) {
                    res.status(404).json("ID doesn't exist")
                } else {
                    res.status(200).json(records)
                }
                // records !== [] ? res.status(200).json(records) : res.status(404);
            } catch (error) {
                console.error(error);
                res.status(400).json(`Error message: ${error}` );
            }   
        } 
})
router.post("/users/login", verifyUser, async (req, res) => {
    const email = req.body.email;
    try {
        const data = await sequelize.query("SELECT * FROM users WHERE email = ?", {replacements: [req.body.email], type: sequelize.QueryTypes.SELECT,})
        console.log(data[0].Admin);
        console.log(data[0].Name);
        console.log(data[0].id);
        // const user = req.body;
        const username = data[0].Name;
        const admin = data[0].Admin;
        const id = data[0].ID;
        console.log(data)
        const payload = {
            user: username,
            role: admin,
            id: id
        }
        console.log(payload)
        const token = jwt.sign({payload}, jwtKey, { expiresIn: "1h" });
        res.status(200).json({Message: `You're welcome ${username}`, Token: token});
        console.log(token);
    } catch (error) {
        res.status(400).json("Error message: " + error);
        console.error(error);
    }
});
router.post("/users/signup", existingUser, async (req, res) => {
    const { name, email, password, direction } = req.body;
    try {
        if (name && email && password && direction) {
            const add = await sequelize.query(
                "INSERT INTO users (Name, Email, Password, Direction) VALUES (:name, :email, :password, :direction)",
                { replacements: {name, email, password, direction } }
            )
            res.status(200).json("User added");
        } else {
            res.status(400).json("Error message: You need to insert the data required" );
        }
    } catch (error) {
        res.status(400).json("Error message: " + error);
        console.error(error);
    }
});
router.put("/users/admin-update/:id", verifyUserId, async(req, res) => {
        // Admins can make changes over any user by providing an email
        const { name, email, password, direction, admin } = req.body;
        try {
            //The next const calls the function GETID in order to get the id of the user desired. It will use the email to make the query and find the id.
            // const user_id = await getID(req.body.email);
            const user_id = req.params.id;
            const update = await sequelize.query(
                "UPDATE users SET name = :name, email = :email, password = :password, direction = :direction, admin = :admin WHERE id = :id",
                { replacements: {name, email, password, direction, admin, id: user_id } }
            )
            // console.log(update)
            // update.forEach(element => {
            //     console.log(element.info)
            // });
            res.status(200).json(`User updated correctly`);
        } catch (error) {
            console.error(error);
            res.status(400).json("Error message: " + error);
        } 
})
router.put("/users/client-update", async(req, res) => {
    const { name, email, password, direction } = req.body;
        try {
            console.log(req.user.payload);
            //Those who are not admins can only make changes in their own ID not in the id of others. The id is taken from the "payload" which was created when the token was generated.
            const user_id = await req.user.payload.id;
            const update = await sequelize.query(
                "UPDATE users SET name = :name, email = :email, password = :password, direction = :direction WHERE id = :id",
                { replacements: {name, email, password, direction, id: user_id} }
            )
            res.status(200).json(`User updated corrrectly`);
        } catch (error) {
            console.error(error);
            res.status(400).json(error);
        }
})
// router.delete("/users", verifyUser, async(req, res) => {
//     if(req.user.payload.role == 1 ) {
//         try {
//             //The next const calls the function GETID in order to get the id of the user desired. It will use the email to make the query and find the id.
//             const user_id = await getID(req.body.email);
//             const deleteUser = await sequelize.query(
//                 "DELETE FROM users WHERE id = :id",
//                 { replacements: {id: user_id} }
//             )
//             res.status(200).json("User removed");
//         } catch (error) {
//             console.error(error);
//             res.status(400).json("Error: " + error);
//         }
//     } else {
//         try {
//             //Those who are not admins can only make changes in their own ID not in the id of others. The id is taken from the "payload" which was created when the token was generated.
//             const user_id = await req.user.payload.id;
//             const deleteUser = await sequelize.query(
//                 "DELETE FROM users WHERE id = :id",
//                 { replacements: {id: user_id} }
//             )
//             res.status(200).json("User removed");
//         } catch(error) {
//             console.error(error);
//             res.status(400);
//         }
//     }
// })
router.delete("/users/admin-delete/:id", checkAdmin, async(req, res) => {
        try {
            //The next const calls the function GETID in order to get the id of the user desired. It will use the email to make the query and find the id.
            // const user_id = await getID(req.body.email);
            const user_id = req.params.id;
            const deleteUser = await sequelize.query(
                "DELETE FROM users WHERE id = :id",
                { replacements: {id: user_id} }
            )
            res.status(200).json("User removed");
        } catch (error) {
            console.error(error);
            res.status(400).json("Error: " + error);
        }
})
router.delete("/users/client-delete", verifyUser, async(req, res) => {
    try {
        //Those who are not admins can only make changes in their own ID not in the id of others. The id is taken from the "payload" which was created when the token was generated.
        const user_id = await req.user.payload.id;
        const deleteUser = await sequelize.query(
            "DELETE FROM users WHERE id = :id",
            { replacements: {id: user_id} }
        )
        res.status(200).json("User removed");
    } catch(error) {
        console.error(error);
        res.status(400);
    }
})

//Export routes
module.exports = router;
