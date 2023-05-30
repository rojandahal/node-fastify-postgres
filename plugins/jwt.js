const fp = require('fastify-plugin');

module.exports = fp(async function (fastify, opts) {
  fastify.register(require('@fastify/jwt'), {
    secret: process.env.SECRET_KEY,
  });

  // fastify.decorate('authenticate', async function (req, reply, done) {
  //   const token = req.session.userId;
  //   try {
  //     if (!token) {
  //       reply.code(401).send({ error: 'Unauthorized' });
  //       return done();
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     throw new Error(err);
  //   }
  //   done();
  // });

  fastify.decorate('updateTokenExpiry', async function (req, reply, done) {
    if (req.session && req.session.cookie && req.session.cookie.expires) {
      const sessionRecord = new Date(req.session.cookie.expires);
      const sessionExpirationTime = sessionRecord.getTime();
      const currentTime = Date.now();
      console.log(sessionExpirationTime);
      console.log(currentTime);
      console.log(req.session);

      console.log(currentTime > sessionExpirationTime);
      if (currentTime >= sessionExpirationTime) {
        // Session has expired
        // Handle the expired session scenario
        console.log('Session Expired, Unauthorized');
        reply.code(401).send({ message: 'Session Expired, Unauthorized' });
        done();
      } else {
        // Session is still active
        // Proceed with the protected route logic
        // ...
        // reply.code(200).send({ message: 'Session is Still Active' });
      }
    } else {
      // Session information not available or missing expiration time
      // Handle the scenario accordingly
      res.redirect('/login');
    }
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
