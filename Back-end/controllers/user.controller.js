// Ajout de plugin externe
const bcrypt = require('bcrypt')        // sert a cryter une chaine de caractere
const jwt = require('jsonwebtoken');    // sert a generer un token d'authentification
const db = require("../models");
const fs = require('fs');
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

  User.findOne({ email: req.body.email }) // recherche de l'utilisateur en fonction de son email
  .then(user => {
    // if (user) {    // Email déja en BDD
    //   return res.status(401).json({ error: 'Utilisateur déja existant' });
    // }

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
  });
};

// log un user et avec la verification de son mot de passe
exports.logIn = (req, res) => {
  User.findOne({ email: req.body.email }) // recherche de l'utilisateur en fonction de son email
  .then(user => {
  if (!user) {    // Utilisateur pas erregistré
    return res.status(401).json({ error: 'Utilisateur non trouvé !' });
  }
  bcrypt.compare(req.body.password, user.password)    // comparaison avec le mot de passe crypter en BDD
    .then(valid => {
      if (!valid) {
          return res.status(401).json({ error: 'Mot de passe incorrect !' });
      }
      res.status(200).json({
        userId: user._id,
        token: jwt.sign(          //utilisisation de jsonWebToken
          { userId: user._id },   //gestion du UserId
          '$2b$10$hLNQnC3nMg7RQgnrDcdj9Oltl.UBmGruFCuNz2G.y33AjMgLJEJbq', // clé de cryptage
          { expiresIn: '24h' }    // temps de validité
        )
      });
      sessionStorage.setItem('token',token)
    })
    .catch(error => res.status(500).json({ error }));
  })
  .catch(error => res.status(500).json({ error }));
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
  const id = req.params.id;

  User.findOne({ id: id }) // recherche de l'utilisateur en fonction de son email
  .then(user => {    
    const filename = user.imageUrl.split('/images/')[1];
      if (filename !== 'user.png'){
        fs.unlink(`./images/${filename}`, (err) => {
          if (err) throw err;
        });
      }
    User.destroy({
      where: { id: id }
    })
    .then(num => {   
      res.status(200).send({
        message: "Utilisateur supprimé avec l'ID :" + id
      });
    })
    .catch(err => {
      res.status(500).send({
        message: "Impossible de supprimé cet utilisateur avec cet email : " + id
      });
    });
  })
  
  
};
  
// Retourne tout les utilisateur en ligne
exports.getAllOnline = (req, res) => {

};