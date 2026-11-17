module.exports = app => {
  const products = require("../controllers/picture.controller.js");
  const upload = require("../middleware/upload.js");

  var router = require("express").Router();

  router.post("/", upload.single("picture"), products.create);

  app.use('/api/pictures', router);
};