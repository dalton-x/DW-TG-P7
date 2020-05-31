// Ajout des middleweares
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config-post');

module.exports = app => {
  const postCtrl = require("../controllers/post.controller.js");

  var router = require("express").Router();

  router.post("/create/:id",auth, multer, postCtrl.createPost);     // Création d'un post par un utilisateur
  router.get("/",auth, postCtrl.getAllPost);                        // Récuperer tout les posts crées
  router.get("/:id",auth, postCtrl.getOnePost);                     // Récupere un pot en fonction de son Id
  router.put("/:id",auth, multer, postCtrl.updatePost);             // Mettre a jour un post
  router.delete("/:id",auth, multer, postCtrl.deletePost);          // Supprimer un post

  app.use('/api/post', router);

};