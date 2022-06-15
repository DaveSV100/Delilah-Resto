const express = require("express");
const sequelize = require("../database/connection.js");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const jwtKey = process.env.JWTKEY;
const router = express.Router();

//algorithms: ["RS256"]
router.use(expressJwt({ secret: jwtKey, algorithms: ["HS256"] }).unless({ path: ["/", "/login"] }));

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

//GET ID function for "/modifyuser" and "/deleteuser" routes
const getID = async(user_email) => {
    const user = await sequelize.query("SELECT id FROM usuarios WHERE email = ?", { replacements: [user_email], type: sequelize.QueryTypes.SELECT, })
    const id = user[0].id;
    console.log(id);
    return id;
}
//**UPDATE**
router.put("/modifyuser", verifyUser, async(req, res) => {
    const { name, email, password, direction, admin } = req.body;
    try {
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
})

/**DELETE**/
router.delete("/deleteuser", verifyUser, async(req, res) => {
    try {
        const user_id = await getID(req.body.email);
        const deleteUser = await sequelize.query(
            "DELETE FROM usuarios WHERE id = :id",
            { replacements: {id: user_id} }
        )
        res.status(200).json("User removed");
    } catch (error) {
        console.error(error);
    }
})


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


//******* OLD CODE *******
//Middleware
// router.get("/users", (req, res) => {
//     sequelize
//         .query("SELECT * FROM usuarios", { type: sequelize.QueryTypes.SELECT })
//         .then(function (records) {
//           res.status(200).send(JSON.stringify(records, null, 2));
//         });
//   });
// const verifyId = (req, res, next) => {
//     idquery = req.params.id;
//     // let contact = data.find(item => item.id == req.params.id)
//     // if (!contact) {
//     //     // res.status(404).json('User not found');
//     //     res.status(404).send('ID not found');
//     // }
//     sequelize.query("SELECT * FROM usuarios WHERE id = ?", {replacements: [idquery],type: sequelize.QueryTypes.SELECT,})
//       .then(function (records) {
//           const queryData = JSON.stringify(records);
//           console.log(queryData)
//         if(queryData != "[]") {
//             next();
//         } else if (queryData == "[]") {
//             res.status(404).send("User not found :V")
//         }
//         // res.status(200).send(JSON.stringify(records, null, 2));
//       });
//   };
//   router.get("/login/:id", verifyId, (req, res) => {
//     const id = req.params.id;
//     console.log("this is id " +id);
//     if (req.params.id != null) {
//       sequelize
//         .query("SELECT * FROM usuarios WHERE id = ?", {
//           replacements: [req.params.id],
//           type: sequelize.QueryTypes.SELECT,
//         })
//         .then(function (records) {
//             console.log(records[0].id)
//           res.status(200).send(JSON.stringify(records));
//         });
//     } else {
//       // sequelize.query('SELECT * FROM usuarios', { type: sequelize.QueryTypes.SELECT })
//       // .then(function(records) {
//       //     res.status(200).send(JSON.stringify(records, null, 2));
//       // })
//       res.status(404).send("You need to insert the ID");
//     }
//     //Find returns the element found
//     // let contact = data.find(item => item.id == req.params.id)
//     // res.status(200).send(contact);
//   });
//   router.delete("/users/:id", verifyId, (req, res, next) => {
//     let id = req.params.id;
//     let index = data.findIndex((item) => item.id == id);
//     console.log(index);
//     data.splice(index, 1);
//     res.status(200).json(data);
//   });
//   //Middleware
//   const verifyName = (req, res, next) => {
//     let contact = data.find((item) => item.name == req.params.name);
//     if (!contact) {
//       // res.status(404).json('User not found');
//       res.status(404).send("User not found");
//     }
//     next();
//   };
//   //Get users (read, obtain)
//   //NAME
//   router.get("/users/:name", verifyName, (req, res, next) => {
//     let contact = data.find((item) => item.name == req.params.name);
//     // if (contact) {
//     //     getResponse = {
//     //         error: false,
//     //         code: 200,
//     //         message: 'Get user',
//     //         response: contact
//     //     };
//     // } else {
//     //     getResponse = {
//     //         error: true,
//     //         code: 404,
//     //         message: 'User not found'
//     //     };
//     // }
//     res.status(200).send(contact);
//   });
  

//Export routes
module.exports = router;