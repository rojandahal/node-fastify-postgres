'use strict';
const { logoutUser } = require('../../controller/handler/authHandler');

module.exports = async function (fastify, opts) {
  fastify.post('/', {
		onRequest: fastify.authenticate,
    handler: logoutUser,
  });
};
