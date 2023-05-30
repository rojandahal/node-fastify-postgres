const fp = require('fastify-plugin');

module.exports = fp(async function (fastify, opts) {
  fastify.register(require('@fastify/jwt'), {
    secret: process.env.SECRET_KEY,
  });

  fastify.decorate('authenticate', async function (req, reply, done) {
    const token = req.session.userId;
    try {
      if (!token) {
        reply.code(401).send({ error: 'Unauthorized' });
        return done();
      }
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
    done();
  });

  fastify.decorate('getUserFromToken', async function (req, reply, done) {
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
