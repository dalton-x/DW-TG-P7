// Ajout de plugin externe
const bcrypt = require('bcrypt')        // sert a cryter une chaine de caractere
const jwt = require('jsonwebtoken');    // sert a generer un token d'authentification
const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;



// Sauvegarde la création d'un nouvel utilisateur
exports.create = (req, res) => {
  //verification des données vide
  if (!req.body.email && !req.body.firstname && !req.body.lastname && !req.body.password && !req.body.pseudo) {
    res.status(400).send({
      message: "Le contenu ne peut pas être vide !"
    });
    return;
  }

  // Haschage du mot de passe
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
  
  // Création de l'objet user avec le retour du front-end
  const user = {
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: hash,
    pseudo: req.body.pseudo,
    imageUrl: "http://localhost:3000/images/user.png",
    online: 1,
    isAdmin: 0,
    dateInscription: new Date()
  };
  
    // Création de l'utilisateur dans la BDD
    User.create(user)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(501).send({
        message:
        err.message && "Une erreur s'est produite lors de la création de l'utilisateur."
      });
    });
  })
  .catch(error => res.status(502).json({ error }));
};

// log un user et avec la verification de son mot de passe
exports.logIn = (req, res) => {
    
};

// Recuperation d'un user avec son email
exports.getOne = (req, res, next) => {

};

// Retourne tout les utilisateurs de la base de données
exports.getAll = (req, res) => {
    
};

// Met a jour les données de l'utilisateur
exports.update = (req, res, next) => {
    
};
  
// Supprime un utilisateur en fontion de son email
exports.delete = (req, res) => {

};
  
// Retourne tout les utilisateur en ligne
exports.getAllOnline = (req, res) => {

};