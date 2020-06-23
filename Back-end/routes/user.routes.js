// Ajout des middleweares
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

module.exports = app => {
  const userCtrl = require("../controllers/user.controller.js");

  var router = require("express").Router();

  router.post("/signup", userCtrl.create);
  router.post("/login", userCtrl.logIn);
  // router.get("/",auth, userCtrl.getAll);
  router.get("/:id", auth, multer, userCtrl.getOne);
  // router.get("/online",auth, userCtrl.getAllOnline);
  router.put("/:id", auth, multer, userCtrl.update);
  router.delete("/:id", auth, multer, userCtrl.delete);

  app.use('/api/user', router);

};