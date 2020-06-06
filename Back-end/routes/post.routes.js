// Ajout des middleweares
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

module.exports = app => {
  const postCtrl = require("../controllers/post.controller.js");

  var router = require("express").Router();

  router.post("/create/:id",auth, multer, postCtrl.createPost);         // Création d'un post par un utilisateur
  router.get("/:keywords",auth, multer, postCtrl.getPostByKeywords);    // Récupération des mots clés     
  router.get("/",auth, multer, postCtrl.getAllPost);                    // Récuperer tout les posts crées
  router.get("/:id",auth, multer, postCtrl.getOnePost);                 // Récupere un pot en fonction de son Id
  router.put("/:id",auth, multer, postCtrl.updatePost);                 // Mettre a jour un post
  router.delete("/:id/:postId",auth, multer, postCtrl.deletePost);      // Supprimer un post

  app.use('/api/post', router);

};