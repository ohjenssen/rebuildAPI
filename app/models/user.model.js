module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    userID: {
      type: Sequelize.INTEGER,
      primaryKey: true, // By default Sequelize assumes every table has a primary key called id, unless you explicitly tell it otherwise, so if in your database, theres an id thats just called "id", this line is unesseccary. BUT, if its called something else like 'prodID' you will need to tell it that is the primary key.
      autoIncrement: true,
    },
    userName: {
      type: Sequelize.STRING
    },
    userEmail: {
      type: Sequelize.STRING
    },
    userPhone: {
      type: Sequelize.STRING
    },
    userAddress: {
      type: Sequelize.STRING
    },
    userImage: {
      type: Sequelize.STRING
    }
  },
  {
    tableName: 'users',
    timestamps: false,
  });

  return User;
};