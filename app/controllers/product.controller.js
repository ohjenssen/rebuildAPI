const db = require("../models");
const Product = db.products;
const Op = db.Sequelize.Op;

// Create and Save a new Product
exports.create = (req, res) => {
  if(!req.body.prodName){
        res.status(400).send({
            message: "Content cannot be empty!"
        });
        return;    
    }

    // Create a Product
    const product = {
        prodUserID: req.body.prodUserID,
        prodName: req.body.prodName,
        prodDesc: req.body.prodDesc,
        prodCategory: req.body.prodCategory,
        prodAmount: req.body.prodAmount,
        prodUnitID: req.body.prodUnitID,
        prodPrice: req.body.prodPrice,
        prodLocation: req.body.prodLocation
    };

    // Save Product in the database
    Product.create(product)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating the Product."
            });
        });
};

// Retrieve all Products from the database.
exports.findAll = (req, res) => {
    const prodName = req.query.prodName;
    var condition = prodName ? { prodName: { [Op.like]: `%${prodName}%` } } : null;

    Product.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving products."
            });
        });
};

// Find a single Product with an id
exports.findOne = (req, res) => {
    const prodID = req.params.prodID;

    Product.findByPk(prodID)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                message: `Cannot find Product with id=${prodID}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Product with id=" + prodID
            });
        });
};

// Update a Product by the id in the request
exports.update = (req, res) => {
    const prodID = req.params.prodID;

    Product.update(req.body, {
        where: { prodID: prodID }
    })
        .then(num => {
        if (num == 1) {
            res.send({
                message: "Product was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Product with id=${prodID}. Maybe Product was not found or req.body is empty!`
            });
        }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Product with id=" + prodID
            });
        });
};

// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
    const prodID = req.params.prodID;

    Product.destroy({
        where: { prodID: prodID }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Product was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Product with id=${prodID}. Maybe Product er sauna?!`
            });
        }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Product with id=" + prodID
            });
        });
};

// // Delete all Products from the database.
// exports.deleteAll = (req, res) => {
//       Product.destroy({
//         where: {},
//         truncate: false
//     })
//         .then(nums => {
//             res.send({ message: `${nums} Product were deleted successfully!` });
//             })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                 err.message || "Some error occurred while removing all products."
//             });
//         });
// };

// // Find all published Products
// exports.findAllPublished = (req, res) => {
//     Products.findAll({ where: { published: true } })
//         .then(data => {
//             res.send(data);
//         })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving products."
//       });
//     });
// };
