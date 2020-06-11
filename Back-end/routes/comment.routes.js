// Ajout des middleweares
const auth = require('../middleware/auth');

module.exports = app => {
  const commentCtrl = require("../controllers/comment.controller.js");

  var router = require("express").Router();

  router.post("/create/:id/:postId", commentCtrl.createComment);
  router.get("/:id",auth, commentCtrl.getAllCommentOnePost);
  router.put("/:id",auth, commentCtrl.update);
  router.delete("/:id",auth, commentCtrl.delete);

  app.use('/api/comment', router);

};