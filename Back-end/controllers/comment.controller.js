// Ajout de plugin externe
const db = require("../models");
const User = db.user;
const Post = db.post;
const Comment = db.comment;



// Sauvegarde la création d'un nouveau commentaire
exports.createComment = (req, res) => {
    newComment = {
        pseudoComment: req.body.pseudoComment,
        comment: req.body.comment,
        postId: req.params.postId,
        commentDate: new Date()
      }
  
      // Création du post dans la BDD
      Comment.create(newComment)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(501).send({
          message:
          err.message && "Une erreur s'est produite lors de la création du commentaire."
        });
      });
};

// Retourne tout les commentaires d'un post
exports.getAllCommentOnePost = (req, res) => {
    let postId = req.params.postId
    Comment.findAll({
        where: {postId:postId},
        order: [ 
        ['commentDate', 'CRES']    // ordre de tri 'descresendo' en fonction de la colonne date
        ],
    })
    .then(comment => {
        res.status(200).json(comment);
    });
};

// Met a jour les informations d'un commentaire
exports.update = (req, res, next) => {

};
  
// Supprime un commentaire en fonction de son id
exports.deleteComment = (req, res) => {
    const reqParams = req.params
    console.log("reqParams",reqParams)
    Comment.findOne( { where: { id: req.params.commentId } })  
    .then(comment => {
        Comment.destroy({ where: { id: req.params.commentId } })
          .then(() => res.status(200).json({ message: 'Commentaire supprimé !' }))
          .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};