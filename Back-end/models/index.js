const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Déclaration des models
db.user = require("./user.js")(sequelize, Sequelize);
db.post = require("./post.js")(sequelize, Sequelize);
db.comment = require("./comment.js")(sequelize, Sequelize);

db.post.hasMany(db.comment, {foreignKey: 'postId', sourceKey: 'id'});
db.comment.belongsTo(db.post, {foreignKey: 'postId', targetKey: 'id'});

module.exports = db;
