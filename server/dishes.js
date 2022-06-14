const express = require("express");
const sequelize = require("../database/connection.js");
const jwt = require("jsonwebtoken");
// const expressJwt = require("express-jwt");
const jwtKey = process.env.JWTKEY;
const router = express.Router();

module.exports = router;