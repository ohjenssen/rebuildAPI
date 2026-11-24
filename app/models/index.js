
const dbConfig = require("../db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  //operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
  dialectOptions: {
    ssl: {
      require: false,
      rejectUnauthorized: false
    }
  },
  logging: console.log
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.products = require("./product.model.js")(sequelize, Sequelize);
db.users = require("./user.model.js")(sequelize, Sequelize);
db.pictures = require("./picture.model.js")(sequelize, Sequelize);

// Associations, one-to-many relationship between products and pictures
//De fortæller Sequelize, at ét produkt kan have flere billeder
db.products.hasMany(db.pictures, {
  foreignKey: "prodID",
  as: "pictures"
});

db.pictures.belongsTo(db.products, {
  foreignKey: "prodID",
  as: "product"
});

// Debug: undersøger relationerne
//console.log("ASSOCIATION TARGET:", db.products.associations.pictures?.target?.name);
//console.log("RELATIONER I INDEX:", Object.keys(db.products.associations));

module.exports = db;
