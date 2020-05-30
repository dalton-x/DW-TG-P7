// Ajout des middleweares
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

module.exports = app => {
  const postCtrl = require("../controllers/post.controller.js");

  var router = require("express").Router();

  router.post("/create",auth, multer, postCtrl.create);         // Création d'un post par un utilisateur
  router.get("/",auth, postCtrl.getAll);                        // Récuperer tout les posts crées
  router.get("/:id",auth, postCtrl.getOne);                     // Récupere un pot en fonction de son Id
  router.put("/:id",auth, multer, postCtrl.update);             // Mettre a jour un post
  router.delete("/:id",auth, multer, postCtrl.delete);          // Supprimer un post

  app.use('/api/post', router);

};