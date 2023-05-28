'use strict';
const { setUserOpts } = require('../../controller/schema/userSchema');

const { setUser } = require('../../controller/handler/userHandler');

module.exports = async function (fastify, opts) {
  fastify.post('/', {
    schema: setUserOpts,
    handler: setUser,
  });
};
