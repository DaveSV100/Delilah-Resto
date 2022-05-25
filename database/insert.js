// const { QueryTypes } = require("sequelize/types");
const sequelize = require("./connection.js");

// async function findAllRows() {
//     let array_insert = ["1", "test1", "test2"];
//     sequelize.query("INSERT INTO `restaurant`(`ID_USER`, `NOM_RESTO`, `ADRESS`) VALUES(?, ?, ?)",
//     { replacements: array_insert, type: sequelize.QueryTypes.SELECT }
//     ).then(function (projects) {
//         console.log(projects)
//     })
// }
// findAllRows();

const User = sequelize.define("User", {
    firstName: {
      type: Sequelize.STRING,
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  });
  
  await User.sync();