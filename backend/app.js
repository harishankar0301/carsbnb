var express = require("express");
var app = express();
const path = require("path");
var fs = require("fs");
var controller = require("./controller/controller");
var cars_controller = require("./controller/cars_controller");
var cars2 = require("./controller/cars2controller");
var current_user = '';
global.current_user = current_user;

//Environments for local development
require('dotenv').config()

//firing controllers
controller(app);
cars2(app);
cars_controller(app);

var Sequelize = require("sequelize");
global.Sequelize = Sequelize;

const orm = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    dialectOptions: {
      //requestTimeout: 70000,
    //   options: {
    //     encrypt: true,
    //   },
    },
    //   operatorsAliases: false,

    // pool: {
    //   max: 50,
    //   min: 0,
    //   acquire: 60000,
    //   idle: 10000,
    // },
  }
);

orm
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const db = orm.define("users", {
  email: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  image: {
    type: Sequelize.BLOB("long"),
  },
  
},{
  timestamps: false
})


global.orm = orm;
global.db = db;

// ***********************************************************************************************************************
//Routing frontend to angular

app.use("/", express.static(path.join(__dirname, "frontend")));
app.use((req, res, next) => {

  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});





//exporting to server.js
module.exports = app;
