const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new Product
exports.create = (req, res) => {
  if(!req.body.userName){
        res.status(400).send({
            message: "Content cannot be empty!"
        });
        return;    
    }

    // Create a User
    const user = {
        userID: req.body.userID,
        userName: req.body.userName,
        userEmail: req.body.userEmail,
        userPhone: req.body.userPhone,
        userAddress: req.body.userAddress,
        userImage: req.body.userImage,
    };

    // Save a User in the database
    User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating a User."
            });
        });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    const userName = req.query.userName;
    var condition = userName ? { userName: { [Op.like]: `%${userName}%` } } : null;

    User.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving users."
            });
        });
};

// Find a single User with an id
exports.findOne = (req, res) => {
    const userID = req.params.userID;

    User.findByPk(userID)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                message: `Cannot find the User with id=${userID}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving the User with id=" + userID
            });
        });
};

// Update a User by the id in the request
exports.update = (req, res) => {
    const userID = req.params.userID;

    User.update(req.body, {
        where: { userID: userID }
    })
        .then(num => {
        if (num == 1) {
            res.send({
                message: "User was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update User with id=${userID}. Maybe User was not found or req.body is empty!`
            });
        }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + userID
            });
        });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    const userID = req.params.userID;

    User.destroy({
        where: { userID: userID }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "The User was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete the User with id=${userID}. Maybe the User er sauna?!`
            });
        }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete the User with id=" + userID
            });
        });
};