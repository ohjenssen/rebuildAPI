// const dbConfig = require("../db.config.js");

// const Sequelize = require("sequelize");
// const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
//   host: dbConfig.HOST,
//   port: dbConfig.PORT,
//   dialect: dbConfig.dialect,
//   //operatorsAliases: false,

//   pool: {
//     max: dbConfig.pool.max,
//     min: dbConfig.pool.min,
//     acquire: dbConfig.pool.acquire,
//     idle: dbConfig.pool.idle
//   },
//   dialectOptions: {
//     ssl: {
//       require: false,
//       rejectUnauthorized: false
//     }
//   },
//   logging: console.log
// });

// const db = {};

// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// db.products = require("./product.model.js")(sequelize, Sequelize);
// db.users = require("./user.model.js")(sequelize, Sequelize);

// module.exports = db;

const dbConfig = require("../db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  pool: dbConfig.pool,
  dialectOptions: {
    ssl: false  // Simply.com understøtter normalt ikke SSL
  },
  logging: console.log
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models
db.products = require("./product.model.js")(sequelize, Sequelize);
db.users = require("./user.model.js")(sequelize, Sequelize);

module.exports = db;
