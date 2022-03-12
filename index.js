const express = require('express');
const bodyParser = require('body-parser');
const { response } = require('express');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Port listener
app.listen(port, () => {
    console.log('Server started at port 3000');
})

//This will be linked to the data base in the future
const data = [
    {
        name: 'David',
        email: 'davidsv20@icloud.com'
    },
    {
        name: 'Steve',
        email: 'steve@icloud.com'
    }
]
//Get users
app.get('/users', (req, res) => {
    getResponse = {
        error: false,
        code: 200,
        message: 'Get users',
        dataBase: data
    };
    res.status(200).send(getResponse);
});
//Post users
app.post('/users', (req, res) => {
    console.log(req.body.name);
    console.log(req.body.email);
    user = {
        name: req.body.name,
        email: req.body.email
    }
    data.push(user);
    postResponse = {
        error: false,
        code: 200,
        message: 'Post new users',
        newUsers: user
    }
    res.status(200).send(postResponse);
})
//If there's an error
app.use((req, res, next) => {
    useResponse = {
        error: true,
        code: 404,
        message: 'Not found'
    };
    res.status(404).send(useResponse);
})

// const express = require('express');
// const app = express();
// const port = 3000;

// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());

// //Port listener
// app.listen(port, () => {
//     console.log(`Server started at port ${port}`);
// })
// app.use(function (req, res, next) {
//     res = {
//         error: true,
//         codigo: 404,
//         mensaje: 'URL no encontrada'
//     };
//     res.status(404).send(respuesta);
// })