// Ajout des middleweares
const auth = require('../middleware/auth');

module.exports = app => {
  const commentCtrl = require("../controllers/comment.controller.js");

  var router = require("express").Router();

  router.post("/create/:id/:commentId", commentCtrl.createComment);
  router.get("/:postId",auth, commentCtrl.getAllCommentOnePost);
  router.put("/:id",auth, commentCtrl.update);
  router.delete("/:commentId",auth, commentCtrl.deleteComment);

  app.use('/api/comment', router);

};