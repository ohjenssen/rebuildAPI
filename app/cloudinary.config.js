const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = cloudinary;

//først: henter cloudinary biblioteket og konfigurerer det med 
// miljøvariabler for cloud_name, api_key og api_secret.
//  Dette gjør det mulig at bruge Cloudinary API for bildeopplasting 
// opretter forbindelse til Cloudinary med de nødvendige 
// legitimationsoplysninger fra .env-filen. 
// Til sidst eksporterer det konfigurerede cloudinary-objekt
// eksporteres, så det kan bruges i andre dele af applikationen.