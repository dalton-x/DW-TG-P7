// Ajout des middleweares
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

module.exports = app => {
  const userCtrl = require("../controllers/user.controller.js");

  var router = require("express").Router();

  router.post("/signup", userCtrl.create);
  router.post("/login", userCtrl.logIn);
  router.get("/",auth, userCtrl.getAll);
  router.get("/:id", multer, userCtrl.getOne);
  router.get("/online",auth, userCtrl.getAllOnline);
  router.put("/:id", multer, userCtrl.update);
  router.delete("/:id", multer, userCtrl.delete);

  app.use('/api/user', router);

};