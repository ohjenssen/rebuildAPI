const multer = require("multer");

const storage = multer.memoryStorage();

// Konfigurerer multer til at bruge memoryStorage, 
// hvilket betyder, at filerne vil blive gemt i hukommelsen 
// som Buffer-objekter i stedet for at blive gemt på disk. 
// Dette er nyttigt, når man ønsker at uploade filer direkte til 
// en ekstern tjeneste som Cloudinary uden at gemme dem midlertidigt 
// på serveren.
// kun tillader billedfiler (mimetype starter med "image/") og 
// begrænser filstørrelsen til 5 MB.
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error("Only image files are allowed!"), false);
        }
    }
});

module.exports = upload;