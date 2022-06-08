require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const sequelize = require("../database/connection.js");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const jwtKey = process.env.JWTKEY;
// const { use } = require('express/lib/application');
const app = express();
const port = 3000;
const helmet = require("helmet");
// const { response } = require('express');
const cors = require("cors");
const { type } = require("express/lib/response");
const corsOptions = {
    origin: "http://127.0.0.1:3000",
}
app.use(compression());
app.use(helmet());
app.use(bodyParser.json());
app.use(express.json());
app.use(cors(corsOptions));
//algorithms: ["RS256"]
app.use(expressJwt({ secret: jwtKey, algorithms: ["HS256"] }).unless({ path: ["/login"] }));
//Port listener
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

app.get("/", (req, res) => {
  res.status(200).send("Bienvenido a Delilah Resto");
});

//Loging with username and password
// sequelize.query('INSERT INTO`restaurant`(`ID_USER`, `NOM_RESTO`, `ADRESSE`) VALUES(?, ?, ?)',
//         { replacements: array_insert, type: sequelize.QueryTypes.SELECT }
//Middleware to check if the user already exists
const verifyUser = (req, res, next) => {
  if(req.body.name && req.body.password != "") {
      sequelize.query("SELECT * FROM usuarios WHERE name = ? && password = ?", { replacements: [req.body.name, req.body.password], type: sequelize.QueryTypes.SELECT, })
      .then((records) => {
          //This if statment verifies whether there's data or not
          if (records[0]) {
              next();
          } else if (records[0] == null) {
              res.status(404).send("User not found :V")
          }
      })
  } else {
      res.status(404).send("You need to insert your name and password");
  }
}
app.post("/login", verifyUser, (req, res) => {
const username = req.body.name;
sequelize.query("SELECT * FROM usuarios WHERE name = ?", {replacements: [req.body.name],type: sequelize.QueryTypes.SELECT,})
.then(function (records) {
      const token = jwt.sign({
          user: username
      }, jwtKey, { expiresIn: "1h" },);
      res.status(200).json({
          token
      });
      console.log(token);
  });
});

// const verifyToken = (req, res, next) => {
//     const bearerHeader = req.headers["authorization"];
//     if(typeof bearerHeader !== "undefined") {
//         const bearer = bearerHeader.split(" ");
//         const bearerToken = bearer[1];
//         req.token = bearerToken;
//         next();
//     } else {
//         res.status(403).send("You're not a user, you need to sign up");
//     }
// }

app.get("/users", (req, res) => {
  // jwt.verify(req.token, jwtKey);
if (req.query.name != null) {
  sequelize
    .query("SELECT * FROM usuarios WHERE name = ?", {
      replacements: [req.query.name],
      type: sequelize.QueryTypes.SELECT,
    })
    .then(function (records) {
      res.status(200).send(JSON.stringify(records, null, 2));
    });
} else {
  sequelize
    .query("SELECT * FROM usuarios", { type: sequelize.QueryTypes.SELECT })
    .then(function (records) {
      res.status(200).send(JSON.stringify(records, null, 2));
    });
}
});


//Middleware
const verifyId = (req, res, next) => {
  idquery = req.params.id;
  // let contact = data.find(item => item.id == req.params.id)
  // if (!contact) {
  //     // res.status(404).json('User not found');
  //     res.status(404).send('ID not found');
  // }
  sequelize.query("SELECT * FROM usuarios WHERE id = ?", {replacements: [idquery],type: sequelize.QueryTypes.SELECT,})
    .then(function (records) {
        const queryData = JSON.stringify(records);
        console.log(queryData)
      if(queryData != "[]") {
          next();
      } else if (queryData == "[]") {
          res.status(404).send("User not found :V")
      }
      // res.status(200).send(JSON.stringify(records, null, 2));
    });
};
app.get("/login/:id", verifyId, (req, res) => {
  const id = req.params.id;
  console.log("this is id " +id);
  if (req.params.id != null) {
    sequelize
      .query("SELECT * FROM usuarios WHERE id = ?", {
        replacements: [req.params.id],
        type: sequelize.QueryTypes.SELECT,
      })
      .then(function (records) {
          console.log(records[0].id)
        res.status(200).send(JSON.stringify(records));
      });
  } else {
    // sequelize.query('SELECT * FROM usuarios', { type: sequelize.QueryTypes.SELECT })
    // .then(function(records) {
    //     res.status(200).send(JSON.stringify(records, null, 2));
    // })
    res.status(404).send("You need to insert the ID");
  }
  //Find returns the element found
  // let contact = data.find(item => item.id == req.params.id)
  // res.status(200).send(contact);
});
app.delete("/users/:id", verifyId, (req, res, next) => {
  let id = req.params.id;
  let index = data.findIndex((item) => item.id == id);
  console.log(index);
  data.splice(index, 1);
  res.status(200).json(data);
});
//Middleware
const verifyName = (req, res, next) => {
  let contact = data.find((item) => item.name == req.params.name);
  if (!contact) {
    // res.status(404).json('User not found');
    res.status(404).send("User not found");
  }
  next();
};
//Get users (read, obtain)
//NAME
app.get("/users/:name", verifyName, (req, res, next) => {
  let contact = data.find((item) => item.name == req.params.name);
  // if (contact) {
  //     getResponse = {
  //         error: false,
  //         code: 200,
  //         message: 'Get user',
  //         response: contact
  //     };
  // } else {
  //     getResponse = {
  //         error: true,
  //         code: 404,
  //         message: 'User not found'
  //     };
  // }
  res.status(200).send(contact);
});

//Post users (write or create)
app.post("/users", (req, res) => {
  console.log(req.body.id);
  console.log(req.body.name);
  console.log(req.body.email);
  console.log(req.body.country);
  // if(!req.body.name || !req.body.email) {
  //     postResponse = {
  //         error: true,
  //         code: 502,
  //         message: "Name and email are required"
  //     };
  // } else {
  //     user = {
  //         id: req.body.id,
  //         name: req.body.name,
  //         email: req.body.email,
  //         country: req.body.country
  //     }
  // }
  const name = req.body.name;
  const email = req.body.email;
  const country = req.body.country;

  // newID += 1;
  // let id = newID;
  let id = data.length + 1;

  const newUser = {
    id: id,
    name: name,
    email: email,
    country: country,
  };

  data.push(newUser);
  // res.status(200).send({newUser, data});
  res.status(200).send(newUser);
});

//Put users (modify or update)
app.put("/users", (req, res) => {
  let filtered = data.filter((e) => e.name === req.body.name);
  console.log(filtered);

  if (filtered.length === 0) {
    putResponse = {
      error: true,
      code: 501,
      message: "Name (user) not found",
    };
  } else {
    filtered.forEach((e) => {
      e.email = req.body.email;
      e.country = req.body.country;
    });
    putResponse = {
      error: false,
      code: 200,
      message: filtered,
    };
  }

  res.status(200).send(putResponse);
});

//Delete users (delete or remove)
app.delete("/login", (req, res) => {
  let filtered = data.filter((e) => e.name === req.body.name);
  console.log(filtered);

  if (filtered.length === 0) {
    putResponse = {
      error: true,
      code: 501,
      message: "Name (user) not found",
    };
  } else {
    filtered.forEach((e) => {
      e.name = null;
      e.email = null;
      e.country = null;
    });
    putResponse = {
      error: false,
      code: 200,
      message: filtered,
    };
  }

  res.status(200).send(putResponse);
});

//Global middleware
app.use((req, res, next) => {
  useResponse = {
    error: true,
    code: 404,
    message: "Not found",
  };
  res.status(404).send(useResponse);
});
// Global middleware
app.use((req, res, next) => {
  console.log("This is a middleware");
  next();
});
//Local middleware
const middleware = (req, res) => {
  res.json("Global middleware");
  next();
};
app.get("/users", middleware, (req, res) => {
  res.send("My route");
});
