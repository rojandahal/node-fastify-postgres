const fp = require('fastify-plugin');

module.exports = fp(async function (fastify, opts) {
  fastify.decorate('authenticate', async function (req, reply, done) {
    const user = req.session.userId;
    console.log(req.session);
    console.log(user);

    if (!user) {
      reply.code(401).send({ error: 'Unauthorized User' });
      return done();
    }

    done();
  });


  // fastify.decorate('getUserFromToken', async function (req, reply, done) {
  //   const token = req.cookies.token;
  //   try {
  //     const decoded = fastify.jwt.verify(token);
  //     return decoded;
  //   } catch (error) {
  //     console.error(error);
  //     throw new Error(error);
  //   }
  // });
});
