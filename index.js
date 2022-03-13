const express = require('express');
// const bodyParser = require('body-parser');
const compression = require('compression');
const { use } = require('express/lib/application');
const app = express();
const port = 3000;
const helmet = require('helmet');
// const { response } = require('express');



const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const jwtKey = 'Password_that_you_want';

app.use(expressJwt({ secret: jwtKey }).unless({ path: ['/login'] }));
let user = {
    name: 'user',
    passcode: 'password'
}


app.use(compression());
app.use(helmet());
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());
app.use(express.json());

app.get('/users', (req, res) => {
    res.status(200).send('heeey');
});

app.post('/login', (req, res) => {
    if(req.body.name == user.name || req.body.password == user.passcode) {
        const token = jwt.sign({
            user: 'user'
        }, jwtKey);
        response.send(token);
    } else {
        response.status(401).end('user not found');
    } 
})

//Port listener
app.listen(port, () => {
    console.log('Server started on port 3000');
})



// //This will be linked to the data base in the future
// const data = [
//     {
//         id: 1,
//         name: 'David',
//         email: 'davidsv20@icloud.com',
//         country: 'Mexico',
//     },
//     {   id: 2,
//         name: 'Steve',
//         email: 'steve@icloud.com',
//         country: 'Spain'
//     },
//     {   id: 3,
//         name: 'Anne',
//         email: 'anne@icloud.com',
//         country: 'Scotland'
//     }
// ]

// //Get users (read, obtain)
// //All users
// app.get('/users', (req, res) => {
//     getResponse = {
//         error: false,
//         code: 200,
//         message: 'Get users',
//         dataBase: data
//     };
//     res.status(200).send(getResponse);
// });
// //Simple get
// app.get('/users', (req, res) => {
//     res.status(200).send(data);
// });

// //Middleware
// const verifyId = (req, res, next) => {
//     let contact = data.find(item => item.id == req.params.id)
//     if (!contact) {
//         // res.status(404).json('User not found');
//         res.status(404).send('ID not found');
//     } 
//     next();
// }
// app.get('/users/:id', verifyId, (req, res, next) => {
//     //Find returns the element found
//     let contact = data.find(item => item.id == req.params.id)
//     res.status(200).send(contact);
// });
// app.delete('/users/:id', verifyId, (req, res, next) => {
//     let id = req.params.id;
//     let index = data.findIndex(item => item.id == id);
//     console.log(index)
//     data.splice(index,1);
//     res.status(200).json(data);
// });
// //Middleware
// const verifyName = (req, res, next) => {
//     let contact = data.find(item => item.name == req.params.name)
//     if (!contact) {
//         // res.status(404).json('User not found');
//         res.status(404).send('User not found');
//     } 
//     next();
// }
// //Get users (read, obtain)
// //NAME
// app.get('/users/:name', verifyName, (req, res, next) => {
//     let contact = data.find(item => item.name == req.params.name)
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
// });

// //Post users (write or create)
// app.post('/users', (req, res) => {
//     console.log(req.body.id);
//     console.log(req.body.name);
//     console.log(req.body.email);
//     console.log(req.body.country);
//     // if(!req.body.name || !req.body.email) {
//     //     postResponse = {
//     //         error: true,
//     //         code: 502,
//     //         message: "Name and email are required"
//     //     };
//     // } else {
//     //     user = {
//     //         id: req.body.id,
//     //         name: req.body.name,
//     //         email: req.body.email,
//     //         country: req.body.country
//     //     }
//     // }
//     const name = req.body.name;
//     const email = req.body.email;
//     const country = req.body.country;

//     // newID += 1;
//     // let id = newID;
//     let id = data.length + 1;

//     const newUser = {
//         "id": id,
//         "name": name,
//         "email": email,
//         "country": country
//     }

//     data.push(newUser);
//     // res.status(200).send({newUser, data});
//     res.status(200).send(newUser);
// })

// //Put users (modify or update)
// app.put('/users', (req, res) => {
//     let filtered = data.filter(e => e.name === req.body.name);
//     console.log(filtered)

//     if(filtered.length === 0) {
//         putResponse = {
//             error: true,
//             code: 501,
//             message: 'Name (user) not found'
//         };
//     } else {
//         filtered.forEach(e => {
//             e.email = req.body.email
//             e.country = req.body.country
//         });
//         putResponse = {
//             error: false,
//             code: 200,
//             message: filtered
//         }
//     }

//     res.status(200).send(putResponse);
// })

// //Delete users (delete or remove)
// app.delete('/users', (req, res) => {
//     let filtered = data.filter(e => e.name === req.body.name);
//     console.log(filtered)

//     if(filtered.length === 0) {
//         putResponse = {
//             error: true,
//             code: 501,
//             message: 'Name (user) not found'
//         };
//     } else {
//         filtered.forEach(e => {
//             e.name = null
//             e.email = null
//             e.country = null
//         });
//         putResponse = {
//             error: false,
//             code: 200,
//             message: filtered
//         }
//     }

//     res.status(200).send(putResponse);
// })

// //Global middleware
// app.use((req, res, next) => {
//     useResponse = {
//         error: true,
//         code: 404,
//         message: 'Not found'
//     };
//     res.status(404).send(useResponse);
// })
// // Global middleware
// app.use((req, res, next) => {
//     console.log('This is a middleware');
//     next();
// })
// //Local middleware
// const middleware = (req, res) => {
//     res.json('Global middleware');
//     next();
// }
// app.get('/users', middleware, (req, res) => {
//     res.send('My route')
// })