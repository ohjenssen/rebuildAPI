const db = require("../models");
const Product = db.products;
const Picture = db.pictures;
const cloudinary = require("../middleware/cloudinary.js");
const streamifier = require("streamifier");
const Op = db.Sequelize.Op;

// Create and Save a new Product
exports.create = function (req, res) {
  console.log("BODY:", req.body);
  console.log("FILE:", req.file);
  // Validate request - product name
  if (!req.body.prodName) {
    res.status(400).send({
      message: "product name is required!",
    });
    return;
  }
  // Validate request - image
  if (!req.file) {
    res.status(400).send({
      message: "product image is required!",
    });
    return;
  }
  // Create a Product with the request body and the image path
  const product = {
    prodUserID: req.body.prodUserID,
    prodName: req.body.prodName,
    prodDesc: req.body.prodDesc,
    prodCategory: req.body.prodCategory,
    prodAmount: req.body.prodAmount,
    prodUnitID: req.body.prodUnitID,
    prodPrice: req.body.prodPrice,
    prodLocation: req.body.prodLocation,
  };

  // Save Product in the database
  Product.create(product).then((data) => {

    const picture = {
      prodID: data.prodID,
      picturePath: "",
    };
    // Upload the image to Cloudinary and save the image path in the database
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "pictures" },
      function (error, result) {

        if (error) {
          res.status(500).send({
            message: "Error uploading file to Cloudinary",
            error: error.message,
          });
          return;
        }

        picture.picturePath = result.secure_url;

        // Gemmer billedet i databasen
        Picture.create(picture)
          .then(function (pictureData) {
            res.send({
                product: data,
                picture: pictureData,
            });
    })
          .catch(function (err) {
            res.status(500).send({
              message: err.message ||
                "Some error occurred while creating the Picture."
            });
          });
      }
    );

    // Sender billedet videre til Cloudinary
    streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
  })
  .catch(function (err) {
    res.status(500).send({
      message: err.message || 
      "Some error occurred while creating the Product."
    });
  });
};

  // Retrieve all Products from the database.
  exports.findAll = (req, res) => {
    const prodName = req.query.prodName;
    var condition = prodName
      ? { prodName: { [Op.like]: `%${prodName}%` } }
      : null;

    Product.findAll({ where: condition })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving products.",
        });
      });
  };

  // Find a single Product with an id
// Find a single Product with an id
exports.findOne = (req, res) => {
  const prodID = req.params.prodID;

  Product.findByPk(prodID)
    .then((data) => {
      return Picture.findOne({ where: { prodID: prodID } })
        .then((pictureData) => {

          console.log("PRODUCT:", data);
          console.log("PICTURE:", pictureData);

          if (data) {
            console.log("MIN NYE FINDONE KØRER");

            res.send({
              product: data,
              picture: pictureData,
            });
          } else {
            res.status(404).send({
              message: `Cannot find Product with id=${prodID}.`,
            });
          }
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Product with id=" + prodID,
      });
    });
};

  // Update a Product by the id in the request, update the image 
  // if a new image is provided
  exports.update = (req, res) => {
    const prodID = req.params.prodID;

    Product.update(req.body, {
      where: { prodID: prodID },
    })
    .then((num) => {
      if (num == 1) {
        //tjekker om der er uploaded et nyt billede
        if (req.file) {

            const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "pictures" },
            function (error, result) {

              if (error){
                return res.status(500).send({
                  message: "Error uploading file/picture to Cloudinary",
                  error: error.message,
                });
              }

              //find det eksisterende billede i db til produktet
              Picture.findOne({ 
                where: { prodID: prodID } 
              })
              .then((pictureData) => {

                if (pictureData) {

                  return Picture.update(
                    { picturePath: result.secure_url },
                    { where: { prodID: prodID } }
            );
                } else {
                  //ellers opret billederække, hvis produktet ikke har et billede
                  return Picture.create({
                    prodID: prodID,
                    picturePath: result.secure_url,
                  });

                }
              })
              .then(() => {
                res.send({
                  message: "Product and picture were updated successfully.",
                });
              })
              .catch((err) => {
                res.status(500).send({
                  message: "Error updating picture for Product with id=" + prodID,
                  error: err.message,
                });
              });
            }
          );
          // Sender billedet videre til Cloudinary
          streamifier
          .createReadStream(req.file.buffer)
          .pipe(uploadStream);
        } else {
          // Hvis der ikke er et nyt billede, send kun opdateringsbeskeden
          res.send({
            message: "Product was updated successfully.",
          });

        }

      } else {
        res.send({
          message: `Cannot update Product with id=${prodID}. 
          Maybe Product was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Product with id=" + prodID,
        error: err.message,
      });
    });
  },

      
  // Delete a Product with the specified id in the request
  //laver delete funktion, som sletter produktet og billedet i databasen,
  // men ikke billedet på cloudinary
  // Delete a Product with the specified id in the request
exports.delete = (req, res) => {
  const prodID = req.params.prodID;

  Picture.destroy({
    where: { prodID: prodID },
  })
    .then(() => {
      return Product.destroy({
        where: { prodID: prodID },
      });
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Product and picture were deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Product with id=${prodID}. Maybe Product was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Product with id=" + prodID,
        error: err.message,
      });
    });
};


