// module.exports = {
//     HOST: process.env.MYSQLHOST || process.env.DB_HOST,
//     USER: process.env.MYSQLUSER || process.env.DB_USER,
//     PASSWORD: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD,
//     DB: process.env.MYSQLDATABASE || process.env.DB_NAME,
//     PORT: process.env.DB_PORT || 3306,
//     dialect: "mysql",
//     pool: {
//         max: 5, 
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     }
// }
module.exports = {
  HOST: process.env.HOST,         // mysql91.unoeuro.com
  USER: process.env.USER,         // mrln_dk
  PASSWORD: process.env.PASSWORD, // cdknwyaehr5fzEtBFg43
  DB: process.env.DB,             // mrln_dk_db
  PORT: process.env.DB_PORT || 3306,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
