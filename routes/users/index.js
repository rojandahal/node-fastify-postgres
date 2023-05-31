'use strict';
const {
  getUsersOpts,
  updateUserOpts,
  deleteUserOpts,
  getUserOpts,
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
    preValidation: fastify.authenticate,
    schema: getUsersOpts,
    handler: getUsers,
  });

  fastify.get('/:id', {
    preValidation: fastify.authenticate,
    schema: getUserOpts,
    handler: getUser,
  });

  fastify.put('/:id', {
    preValidation: fastify.authenticate,
    schema: updateUserOpts,
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
