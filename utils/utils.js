const sequelize = require("../database/connection.js");

const checkAdmin = async(req, res, next) => {
    /* This is what comes in the payload (admin == 1, customer == 0) =>>> user: { payload: { user: 'Nicole Lepariz', role: 0 },iat: 1655393607,exp: 1655397207},*/
    try {
        const role = req.user.payload.role;
        role == 1 ? next() : res.status(403).json("Sorry, only admins have access");
    } catch(error) {
        console.error(error);
    }
}
//Middleware to check if the user already exists
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

//GET ID function for "/modifyuser" and "/deleteuser" routes
const getID = async(user_email) => {
    const user = await sequelize.query("SELECT id FROM usuarios WHERE email = ?", { replacements: [user_email], type: sequelize.QueryTypes.SELECT, })
    const id = user[0].id;
    console.log(id);
    return id;
}

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
module.exports = {
    checkAdmin,
    verifyUser,
    existingUser,
    getID,
    verifyDish,
    getDish
};