module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("post", {
      userPostId: {
        type: Sequelize.STRING,
        require: true
      },
      userPseudoPost: {
        type: Sequelize.STRING,
        require: true
      },
      title: {
        type: Sequelize.STRING,
        require: true
      },
      imagePostUrl: {
        type: Sequelize.STRING
      },
      mood: {
        type: Sequelize.STRING,
        require: true
      },
      keywords: {
        type: Sequelize.STRING,
        require: true
      },
      message: {
        type: Sequelize.STRING,
        require: true
      },
      like: {
        type: Sequelize.STRING,
        require: true
      },
      postDate: {
        type: Sequelize.DATE,
        defaultValue: 0
      }
    },{
        timestamps: false
    })
  
    return Post;
};