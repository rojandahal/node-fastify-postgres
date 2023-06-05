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
  fastify.register(cors, {
    origin: [
      'http://127.0.0.1:5173',
      'http://localhost:5173',
      'http://127.0.0.1:3000',
      'http://localhost:3000',
      'https://accounts.google.com',
    ],
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Type', 'Authorization'],
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
