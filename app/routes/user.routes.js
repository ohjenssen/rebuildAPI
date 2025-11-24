module.exports = app => {
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();

  // Create a new User
  router.post("/", users.create);

  // Retrieve all User
  router.get("/", users.findAll);

  // Retrieve all published User
  // router.get("/published", products.findAllPublished);

  // Retrieve a single User with id
  router.get("/:userID", users.findOne);

  // Update a User with id
  router.put("/:userID", users.update);

  // Delete a User with id
  router.delete("/:userID", users.delete);

  // Delete all User
  // router.delete("/", users.deleteAll);

  app.use('/api/users', router);
};