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
        email: 'davidsv20@icloud.com',
        country: 'Mexico',
    },
    {
        name: 'Steve',
        email: 'steve@icloud.com',
        country: 'Spain'
    },
    {
        name: 'Anne',
        email: 'anne@icloud.com',
        country: 'Scotland'
    }
]

//Get users (read, obtain)
app.get('/users', (req, res) => {
    getResponse = {
        error: false,
        code: 200,
        message: 'Get users',
        dataBase: data
    };
    res.status(200).send(getResponse);
});

//Post users (write or create)
app.post('/users', (req, res) => {
    console.log(req.body.name);
    console.log(req.body.email);
    if(!req.body.name || !req.body.email) {
        postResponse = {
            error: true,
            code: 502,
            message: "Name and email are required"
        };
    } else {
        user = {
            name: req.body.name,
            email: req.body.email,
            email: req.body.country
        }
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

//Put users (modify or update)
app.put('/users', (req, res) => {
    let filtered = data.filter(e => e.name === req.body.name);
    console.log(filtered)

    if(filtered.length === 0) {
        putResponse = {
            error: true,
            code: 501,
            message: 'Name (user) not found'
        };
    } else {
        filtered.forEach(e => {
            e.email = req.body.email
            e.country = req.body.country
        });
        putResponse = {
            error: false,
            code: 200,
            message: filtered
        }
    }

    res.status(200).send(putResponse);
})

//Delete users (delete or remove)
app.delete('/users', (req, res) => {
    let filtered = data.filter(e => e.name === req.body.name);
    console.log(filtered)

    if(filtered.length === 0) {
        putResponse = {
            error: true,
            code: 501,
            message: 'Name (user) not found'
        };
    } else {
        filtered.forEach(e => {
            e.name = null
            e.email = null
            e.country = null
        });
        putResponse = {
            error: false,
            code: 200,
            message: filtered
        }
    }

    res.status(200).send(putResponse);
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