module.exports = app => {
  const products = require("../controllers/product.controller.js");

  var router = require("express").Router();

  // Create a new Product
  router.post("/", products.create);

  // Retrieve all Product
  router.get("/", products.findAll);

  // Retrieve all published Product
  // router.get("/published", products.findAllPublished);

  // Retrieve a single Product with id
  router.get("/:prodID", products.findOne);

  // Update a Product with id
  router.put("/:prodID", products.update);

  // Delete a Product with id
  router.delete("/:prodID", products.delete);

  // Delete all Product
  // router.delete("/", products.deleteAll);

  app.use('/api/products', router);
};