'use strict';
module.exports = async function (fastify, opts) {
  fastify.get('/', fastify.authenticate, );

  fastify.post('/', async function (req, reply) {
		const { title, description, status } = req.body;
		const userId = req.session.user.userId;
  });

  fastify.put('/', async function (req, reply) {
    return { root: true };
  });
};
