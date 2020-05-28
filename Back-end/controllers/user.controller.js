const db = require("../models");
const User = db.User;
const Op = db.Sequelize.Op;

// Sauvegarde la création d'un nouvel utilisateur
exports.create = (req, res) => {
  
};

// log un user et avec la verification de son mot de passe
exports.logIn = (req, res) => {
    
};

// Recuperation d'un user avec son email
exports.getOne = (req, res, next) => {

};

// Retourne tout les utilisateurs de la base de données
exports.getAll = (req, res) => {
    
};

// Met a jour les données de l'utilisateur
exports.update = (req, res, next) => {
    
};
  
// Supprime un utilisateur en fontion de son email
exports.delete = (req, res) => {

};
  
// Retourne tout les utilisateur en ligne
exports.getAllOnline = (req, res) => {

};