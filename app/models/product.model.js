module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("product", {
    prodID: {
      type: Sequelize.INTEGER,
      primaryKey: true, // By default Sequelize assumes every table has a primary key called id, unless you explicitly tell it otherwise, so if in your database, theres an id thats just called "id", this line is unesseccary. BUT, if its called something else like 'prodID' you will need to tell it that is the primary key.
      autoIncrement: true,
    },
    prodUserID: {
      type: Sequelize.INTEGER
    },
    prodName: {
      type: Sequelize.STRING
    },
    prodDesc: {
      type: Sequelize.STRING
    },
    prodDateCreated: {
      type: Sequelize.DATE
    },
    prodCategory: {
      type: Sequelize.INTEGER
    },
    prodAmount: {
      type: Sequelize.INTEGER
    },
    prodUnitId: {
      type: Sequelize.INTEGER
    },
    prodPrice: {
      type: Sequelize.INTEGER
    },
    prodGradeID: {
      type: Sequelize.INTEGER
    },
    prodLocation: {
      type: Sequelize.STRING
    }
  },
  {
    tableName: 'products',
    timestamps: false,
  });

  return Product;
};