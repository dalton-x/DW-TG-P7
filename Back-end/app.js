const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');const cors = require('cors');
const db = require("./models/index");

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


// Route pour les users
require("./routes/user.routes")(app);
// Route pour les posts
require("./routes/user.routes")(app);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Bienvenue sur l'application communautaire de Groupomania" });
});

app.use(cors(corsOptions));

// En production
db.sequelize.sync();

// En developpement DROP les tables apres chaque reboot
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });

module.exports = app;