require("dotenv").config();
const express = require("express");
// const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const cors = require("cors");
const port = process.env.PORT;
const corsOptions = {
    //origin: "*";
    origin: `http://127.0.0.1:5500`
}
const app = express();
const jwtKey = process.env.JWTKEY;

app.use(express.json());
app.use(cors(corsOptions));
//algorithms: ["RS256"]
app.use(expressJwt({ secret: jwtKey, algorithms: ["HS256"] }).unless({path: ["/login"] }));

//Kinda a database
const user = {
    name: "myname",
    password: "mypassword"
}

const news = [
    {
        id: 1,
        titulo: "noticia 1"
    },
    {
        id: 2,
        titulo: "noticia 2"
    }
];

app.get("/news", (req, res) => {
    res.send(news);
});
// app.get("/news", autehticateToken, (req, res) => {
//     res.send(news);
// });

app.post("/login", (req, res) => {
    if(req.body.name == user.name || req.body.password == user.password) {
        const token = jwt.sign({
            login: "user"
        }, jwtKey);
        res.send(token);
    } else {
        res.status(401).end("incorrect user")
    }
});

// function autehticateToken(req, res, next) {
//     const authHeader = req.headers["authorization"]
//     const token = authHeader && authHeader.split(" ")[1];
//     if(token == null) return res.sendStatus(401)
//     jwt.verify(token, process.env.JWTKEY, (err, user) => {
//         if(err) return res.sendStatus(403)
//         req.user = user
//         next()
//     })
// }
app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});
