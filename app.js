'use strict';

const path = require('path');
const AutoLoad = require('@fastify/autoload');
const cors = require('@fastify/cors');
// Define the default options
const defaultOptions = {
  fastify: {
    logger: true,
  },
  // Other options...
};

// Pass --options via CLI arguments in command to enable these options.
module.exports.options = {
  // Merge the default options with the options passed via CLI arguments
  ...defaultOptions,
};

module.exports = async function (fastify, opts) {
  // Place here your custom code!

  //Register cookie plugins
  //Register cookie plugin
  fastify.register(require('@fastify/cookie'), {
    secret: process.env.SECRET_KEY, // for cookies signature
  });
  
  //Setup CORS
  await fastify.register(cors, {
    origin: true,
    credentials: true,
  });

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts),
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, { prefix: process.env.API_VERSION }),
  });
};
