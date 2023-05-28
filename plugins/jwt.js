const fp = require('fastify-plugin');

module.exports = fp(async function (fastify, opts) {
  fastify.register(require('@fastify/jwt'), {
    secret: process.env.SECRET_KEY,
  });

  fastify.decorate('authenticate', async function (req, reply) {
    const token = req.cookies.token;
    try {
      if (!token) {
        reply.code(401).send({ error: 'Unauthorized' });
      }
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  });

  fastify.decorate('getUserFromToken', async function (req, reply) {
    const token = req.cookies.token;
    try {
      const decoded = fastify.jwt.verify(token);
      return decoded;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  });
});
