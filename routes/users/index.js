'use strict';
const {
  getUsersOpts,
  updateUserOpts,
  deleteUserOpts,
} = require('../../controller/schema/userSchema');
const {
  getUsers,
  updateUsers,
  deleteUser,
  getUser,
  getOwnProfile,
} = require('../../controller/handler/userHandler');

module.exports = async function (fastify, opts) {
  fastify.get('/', {
    onRequest: fastify.csrfProtection,
    preValidation: fastify.authenticate,
    schema: getUsersOpts,
    handler: getUsers,
  });

  fastify.get('/:id', {
    preValidation: fastify.authenticate,
    handler: getUser,
  });

  fastify.put('/:id', {
    preValidation: fastify.authenticate,
    schema: updateUserOpts,
    validatorCompiler: ({ schema, method, url, httpPart }) => {
      return (data) => schema.validate(data);
    },
    handler: updateUsers,
  });

  fastify.delete('/:id', {
    preValidation: fastify.authenticate,
    schema: deleteUserOpts,
    handler: deleteUser,
  });

  fastify.get('/google/me', {
    preValidation: fastify.authenticate,
    handler: getOwnProfile,
  });
};
