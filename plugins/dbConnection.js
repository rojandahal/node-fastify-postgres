const fastifyPlugin = require('fastify-plugin');
const { Sequelize } = require('sequelize');
const UserModel = require('../model/user');
const dbConnection = async (fastify, options) => {
  try {
    // Create a new Sequelize instance
    const sequelize = new Sequelize(
      'postgres://postgres:toti2king@localhost/postgres',
    );

    // Test the database connection
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    // Register the Sequelize instance in the Fastify app
    fastify.decorate('sequelize', sequelize);

    // Define models and associations using Sequelize
    // Import the model and pass the Sequelize instance
    const user = UserModel(sequelize);
    // Add the model to the "db" object to export it to other parts of the app
    fastify.decorate('user', user);
		//The force: false prvents the creation of the table if it already exists
    user
      .sync({ force: false })
      .then(() => {
        console.log('User table synced');
      })
      .catch((error) => {
        console.error('Error syncing User table:', error);
      });

    // Synchronize models with the database
    await sequelize.sync();

    // Add a decorator to access the Sequelize instance from routes or plugins
    fastify.decorate('getDbClient', () => sequelize);
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
};

module.exports = fastifyPlugin(dbConnection);
