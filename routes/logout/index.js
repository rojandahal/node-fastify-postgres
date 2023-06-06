'use strict';
const { logoutUser } = require('../../controller/handler/authHandler');

module.exports = async function (fastify, opts) {
  fastify.post('/', {
    handler: logoutUser,
  });
};
