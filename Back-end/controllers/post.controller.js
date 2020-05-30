// Ajout de plugin externe
const bcrypt = require('bcrypt')        // sert a cryter une chaine de caractere
const jwt = require('jsonwebtoken');    // sert a generer un token d'authentification
const db = require("../models");
const fs = require('fs');
const User = db.user;
const Post = db.Post;
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