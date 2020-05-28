const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');const cors = require('cors');
const db = require("./models/index");
const sequelize = require('sequelize')

var corsOptions = {
  origin: "http://localhost:4200"
};

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(bodyParser.json());

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Bienvenue sur l'application communautaire de Groupomania" });
});

app.use(cors(corsOptions));

db.sequelize.sync();

module.exports = app;