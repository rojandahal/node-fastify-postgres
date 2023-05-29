const { DataTypes } = require('sequelize');

const UserModel = (sequelize) => {
  const User = sequelize.define('users', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      // Define the data type
      type: DataTypes.STRING,
      // Enforce a non-null constraint
      allowNull: false,
      // Enforce a unique constraint
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      // Enforce an email format
      validate: {
        isEmail: {
          args: true,
          msg: 'Invalid email format.',
        },
      },
    },
    // Add more columns as needed
  });
  return User;
};

module.exports = UserModel;
