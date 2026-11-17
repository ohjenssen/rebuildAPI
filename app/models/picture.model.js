module.exports = function(sequelize, Sequelize) {
  const Picture = sequelize.define("picture", {
    pictureID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    prodID: {
      type: Sequelize.INTEGER,
    },
    picturePath: {
      type: Sequelize.STRING,
    }
  },
  {
    tableName: "pictures",
    timestamps: false,
  });

  return Picture;
};
