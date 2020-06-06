const db = require("../models");
const fs = require('fs');
// const User = db.user;
const Post = db.post;

// Sauvegarde la création d'un nouveau post
exports.createPost = (req, res) => {
  const id = req.params.id;
  const date = Date.now()
  console.log("DAte",date)

  if (req.file) {
    const parseBody = JSON.parse(req.body.post)

    // on construit l'objet avec l'image
    newPost = {
      userPostId: id,
      userPseudoPost: parseBody.userPseudoPost,
      title: parseBody.title,
      mood: parseBody.mood,
      keywords: parseBody.keywords,
      message: parseBody.message,
      like: 0,
      imagePostUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      postDate: date
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
      userPseudoPost: req.body.userPseudoPost,
      title: req.body.title,
      mood: req.body.mood,
      keywords: req.body.keywords,
      message: req.body.message,
      like: 0,
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

//Retourne tout les posts de la base de données
exports.getPostByKeywords = (req, res) => {
  let keywords = req.params.keywords
  Post.findAll({where: {keywords:keywords}})
  .then(keyword => {
    res.status(200).json(keyword);
    console.log("KEYWORDS",keyword)
  });
};

// Recuperation d'un post avec son Id
exports.getOnePost = (req, res, next) => {
  
};

// Retourne tout les posts de la base de données
exports.getAllPost = (req, res) => {
  Post.findAll({
    order: [ 
      ['postDate', 'DESC']    // ordre de tri 'descresendo' en fonction de la collonne date
    ],
  }).then( // recherche de toutes les information des la BDD
    (posts) => { // si information trouvées
      res.status(200).json(posts); // retour des informations en objets
    }
  ).catch(  // si pas de posts trouvées
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

// Met a jour les données du post selectionné
exports.updatePost = (req, res, next) => {
  
};
  
// Supprime le post en fonction de son Id
exports.deletePost = (req, res) => {
  Post.findOne( { where: { id: req.params.postId } })  
  .then(post => {
    if (post.dataValues.imagePostUrl){
      const filename = post.dataValues.imagePostUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Post.destroy({ where: { id: req.params.postId } })
        .then(() => res.status(200).json({ message: 'Post supprimé !' }))
        .catch(error => res.status(400).json({ error }));
      });
        
    }else{
      Post.destroy({ where: { id: req.params.postId } })
        .then(() => res.status(200).json({ message: 'Post supprimé !' }))
        .catch(error => res.status(400).json({ error }));
    }
  })
  .catch(error => res.status(500).json({ error }));  
};