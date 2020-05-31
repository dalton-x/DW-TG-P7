const db = require("../models");
// const fs = require('fs');
// const User = db.user;
const Post = db.post;



// Sauvegarde la création d'un nouveau post
exports.createPost = (req, res) => {
  const id = req.params.id;
  
  if (req.file) {
    const parseBody = JSON.parse(req.body.post)

    // on construit l'objet avec l'image
    newPost = {
      userPostId: id,
      userPseudoPost: parseBody.userPseudo,
      title: parseBody.title,
      humeur: parseBody.humeur,
      keywords: parseBody.keywords,
      message: parseBody.message,
      imagePostUrl: `${req.protocol}://${req.get('host')}/images_Post/${req.file.filename}`,
      postDate: new Date()
    }

    // Création du post dans la BDD
    Post.create(newPost)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(501).send({
        message:
        err.message && "Une erreur s'est produite lors de la création du post."
      });
    });
  } else {

    // on construit l'objet
    newPost = {
      userPostId: id,
      userPseudoPost: req.body.userPseudo,
      title: req.body.title,
      humeur: req.body.humeur,
      keywords: req.body.keywords,
      message: req.body.message,
      postDate: new Date()
    }

    // Création du post dans la BDD
    Post.create(newPost)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(501).send({
        message:
        err.message && "Une erreur s'est produite lors de la création du post."
      });
    });
  }  
};

// Recuperation d'un post avec son Id
exports.getOnePost = (req, res, next) => {
  
};

// Retourne tout les posts de la base de données
exports.getAllPost = (req, res) => {
    
};

// Met a jour les données du post selectionné
exports.updatePost = (req, res, next) => {
  
};
  
// Supprime le post en fonction de son Id
exports.deletePost = (req, res) => {
  
};