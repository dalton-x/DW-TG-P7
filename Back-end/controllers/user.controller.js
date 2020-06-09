// Ajout de plugin externe
const bcrypt = require('bcrypt')        // sert a cryter une chaine de caractere
const jwt = require('jsonwebtoken');    // sert a generer un token d'authentification
const db = require("../models");
const fs = require('fs');
const User = db.user;



// Sauvegarde la création d'un nouvel utilisateur
exports.create = (req, res) => {
  //verification des données vide
  if (!req.body.email && !req.body.firstname && !req.body.lastname && !req.body.password && !req.body.pseudo) {
    res.status(400).send({
      message: "Le contenu ne peut pas être vide !"
    });
    return;
  }

  User.findOne({ where: {email: req.body.email} }) // recherche de l'utilisateur en fonction de son email
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
  User.findOne({ where: {email: req.body.email} }) // recherche de l'utilisateur en fonction de son email
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
        userId: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        pseudo: user.pseudo,
        isAdmin: user.isAdmin,
        imageUrl: user.imageUrl,
        token: jwt.sign(          //utilisisation de jsonWebToken
          { userId: user.id },   //gestion du UserId
          '$2b$10$hLNQnC3nMg7RQgnrDcdj9Oltl.UBmGruFCuNz2G.y33AjMgLJEJbq', // clé de cryptage
          { expiresIn: '24h' }    // temps de validité
        )
      });
    })
    .catch(error => res.status(500).json({ error }));
  })
  .catch(error => res.status(500).json({ error }));
};

// Recuperation d'un user avec son email
exports.getOne = (req, res, next) => {
  User.findOne({ where: {id: req.params.id} }).then(
    (user) => {
      res.status(200).json(user);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

// Retourne tout les utilisateurs de la base de données
exports.getAll = (req, res) => {
    
};

// Met a jour les données de l'utilisateur
exports.update = (req, res, next) => {
  let updatedUser
  const id = req.params.id;
  
  if (req.file) {
    User.findOne({where: {id: req.params.id}})
  .then(user => {
      // Récupération du nom de l'image
      const filename = user.imageUrl.split('/images/')[1];
      if (filename){
        if (filename !== 'user.png'){
        // Suppression de l'ancienne image      
          fs.unlink(`images/${filename}`, function (error) {
            if (error) throw error;
          });
        }    
      }else{
        return res.status(500).json("Le nom de l'image n'a pas été trouvé")
      }
    const parseBody = JSON.parse(req.body.user)
    // on construit l'objet qui sera mis à jour avec la nouvelle image
    updatedUser = {
      firstname: parseBody.firstname,
      lastname: parseBody.lastname,
      pseudo: parseBody.pseudo,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }
    User.update(updatedUser, {where: { id: id }})
    .then(() => res.status(203).json({ message: 'Utilisateur Mis a jour' }))
    .catch(error => res.status(401).json({ error }));
  })
  .catch(error => res.status(501).json({ error }));
  
  } else {
    //on construit l'objet qui sera mis à jour avec la même image
    updatedUser = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      pseudo: req.body.pseudo,
    }
    User.update(updatedUser, {where: { id: id }})
    .then(() => res.status(203).json({ message: 'Utilisateur Mis a jour' }))
    .catch(error => res.status(401).json({ error }));
  }  
};
  
// Supprime un utilisateur en fontion de son email
exports.delete = (req, res) => {
  const id = req.params.id;

  User.findOne({where: {id: id}})
  .then(user => {
      // Récupération du nom de l'image
      const filename = user.imageUrl.split('/images/')[1];
      if (filename !== 'user.png'){
      // Suppression de l'ancienne image      
        fs.unlink(`images/${filename}`, function (error) {
          if (error) throw error;
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