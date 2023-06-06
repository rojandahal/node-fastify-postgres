const { DataTypes } = require('sequelize');

const TaskModel = (sequelize) => {
  const User = sequelize.define('tasks', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user: {
      type: DataTypes.UUID,
      allowNull: false,
      reference: {
        model: 'users',
        key: 'id',
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Add more columns as needed
  });
  return User;
};

module.exports = TaskModel;
