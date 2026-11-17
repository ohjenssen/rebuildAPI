const db = require("../models");
const Picture = db.pictures;
const cloudinary = require("../middleware/cloudinary.js");
const streamifier = require("streamifier");

// Create and Save a new Picture
exports.create = function (req, res) {
    if (!req.file) {
        res.status(400).send({
            message: "No file uploaded!"

        });
        return;
    
    }
    //opretter objektet med prodID og filnavn
    const picture = {
        prodID: req.body.prodID,
        picturePath: ""
    };

    //sender billedet til cloudinary og gemmer filnavnet i databasen
    const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "pictures" },
        function (error, result) {
            if (error) {
                res.status(500).send({
                    message: "Error uploading file to Cloudinary",
                    error: error.message
                });
            return;
            }
           picture.picturePath = result.secure_url;
           // gemmer billedet i databasen
              Picture.create(picture).then(function (data) {
                res.send(data);

              })
              .catch(function (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Picture."
                });
                });     

        }
    );
    //sender billeder videre til cloudinary
    streamifier.createReadStream(req.file.buffer).pipe(uploadStream);

};