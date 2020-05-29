module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      email: {
        type: Sequelize.STRING,
        unique: true,
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
      imageUrl: {
        type: Sequelize.STRING
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      },
      dateInscription: {
        type: Sequelize.DATE
      },
    },{
        timestamps: false
    })
  
    return User;
};