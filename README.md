# DELILAH RESTO

**Restaurant Rest API**

Backend of a restaurant application where you can manage users, dishes and make orders.
## Get started

### Specifications

The specification for this API is in [Open API Docs](/spec.yaml).

You can copy [Postman samples](https://documenter.getpostman.com/view/11310918/UzJFvdtB) as well.

### 1.- Clone the repository

```
$ git clone https://github.com/DaveSV100/delilah-resto.git
```

or you can also download it as a zip file.

### 2.- Install the dependencies

Use the following command

```
npm install
```

### 3.- Configure the Database

- Run a MYSQL server.

- Import the [queries](database/db-queries) folder into your graphic client like MySQL Workbench.

### 4.- Run the Server

Go to the [server folder](/server/) and run the following command:
```
node index.js
```
### 5.- Now it's ready to use 

:D
#### Dependencies used
- "body-parser": "^1.19.0",
- "compression": "^1.7.4",
- "dotenv": "^16.0.0",
- "express": "^4.17.3",
- "express-jwt": "^6.1.1",
- "helmet": "^5.0.2",
- "jsonwebtoken": "^8.5.1",
- "mysql2": "^2.3.3",
- "sequelize": "^6.20.0",
- "nodemon": "^2.0.18"