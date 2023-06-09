'use strict';

const { loginOpts } = require('../../controller/schema/loginSchema');

const { loginUser } = require('../../controller/handler/authHandler');

module.exports = async function (fastify, opts) {
  fastify.post('/', {
    schema: loginOpts,
    validatorCompiler: ({ schema, method, url, httpPart }) => {
      return (data) => schema.validate(data);
    },
    handler: loginUser,
  });
};
