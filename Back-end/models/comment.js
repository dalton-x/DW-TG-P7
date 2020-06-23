module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("comment", {
    pseudoComment: {
      type: Sequelize.STRING,
      require: true
    },
    comment: {
      type: Sequelize.STRING,
      require: true
    },
    commentDate: {
      type: Sequelize.DATE,
    }
  }, {
    timestamps: false
  })

  return Comment;
};