console.log("SERVER.JS ER STARTET");
const express = require("express");
const cors = require("cors");

// Her initialiserer vi vel appen
const app = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN || ["http://localhost:5173", "http://localhost:5174", "http://localhost:8081"]
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to sauna application." });
});
/* /health ROUTE – Sequelize version */
app.get("/health", async (req, res) => {
  try {
    await db.sequelize.authenticate();
    res.json({
      api: "ok",
      db: "connected"
    });
  } catch (err) {
    res.status(500).json({
      api: "ok",
      db: "error",
      error: err.message
    });
  }
});


require("./app/routes/product.routes")(app);
require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
