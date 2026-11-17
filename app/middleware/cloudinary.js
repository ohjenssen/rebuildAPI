const cloudinary = require("cloudinary").v2;
//denne kode sørger for at backend appen kan oprette forbindelse 
// til Cloudinary API'et
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
module.exports = cloudinary;