module.exports = {
  HOST: "localhost", // adresse de la base de donnée
  USER: "OpenClassroom", // User de la base de donnée
  PASSWORD: "OC2020P7", // Mot de passe de connection de la base de donnée
  DB: "groupomania", // Nom de la base de donnée
  dialect: "mysql", // type de base de donnée
  define: {
    timestamps: false // option pour la creation des tables
  },
  pool: {
    max: 99999, // nombre max de co simultanée
    min: 0, // nombre mini de co simultanée
    acquire: 30000, // temps maximum, en millisecondes, pendant lequel une connexion peut être inactive avant d'être libérée
    idle: 10000 // temps maximum, en millisecondes, que la piscine connexion d'obtenir l'acces avant de lancer l'erreur
  }
};