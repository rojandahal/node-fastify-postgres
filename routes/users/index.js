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
} = require('../../controller/handler/userHandler');

module.exports = async function (fastify, opts) {
  fastify.get('/', {
    onRequest: fastify.authenticate,
    schema: getUsersOpts,
    handler: getUsers,
  });

	fastify.get('/:id', {
		onRequest: fastify.authenticate,
		schema: getUserOpts,
		handler: getUser,
	});

  fastify.put('/:id', {
    onRequest: fastify.authenticate,
    schema: updateUserOpts,
    handler: updateUsers,
  });

  fastify.delete('/:id', {
    onRequest: fastify.authenticate,
    schema: deleteUserOpts,
    handler: deleteUser,
  });
};
