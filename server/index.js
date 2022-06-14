require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const sequelize = require("../database/connection.js");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const jwtKey = process.env.JWTKEY;
const app = express();
const port = 3000;
const helmet = require("helmet");
const cors = require("cors");
// const { type } = require("express/lib/response");
const corsOptions = {
    origin: "http://127.0.0.1:3000",
}
app.use(compression());
app.use(helmet());
app.use(bodyParser.json());
app.use(express.json());
app.use(cors(corsOptions));

const userRoute = require("./users.js");
const dishes = require("./dishes.js");
app.use("/", userRoute);
app.use("/", dishes);
//algorithms: ["RS256"]
app.use(expressJwt({ secret: jwtKey, algorithms: ["HS256"] }).unless({ path: [ "/", "/login", "/signup" ] }));
//Port listener
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

app.get("/", (req, res) => {
  res.status(200).send("Bienvenido a Delilah Resto");
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
