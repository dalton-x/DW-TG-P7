module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      email: {
        type: Sequelize.STRING,
        require: true,
        primaryKey: true
      },
      firstname: {
        type: Sequelize.STRING,
        require: true
      },
      lastname: {
        type: Sequelize.STRING,
        require: true
      },
      password: {
        type: Sequelize.STRING,
        require: true
      },
      pseudo: {
        type: Sequelize.STRING,
        require: true
      },
      avatar: {
        type: Sequelize.STRING
      },
      online: {
        type: Sequelize.BOOLEAN
      },
      isAdmin: {
        type: Sequelize.BOOLEAN
      },
      dateInscription: {
        type: Sequelize.DATE
      },
    },{
        timestamps: false
    })
  
    return User;
};