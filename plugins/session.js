const fastifyPlugin = require('fastify-plugin');
const session = require('@fastify/session');
const pgSession = require('connect-pg-simple')(session);
const { Pool } = require('pg');

const sessionConnect = async (fastify, opts) => {
  //Register session plugin
  const pool = new Pool({
    connectionString: 'postgres://postgres:toti2king@localhost/postgres', // Replace with your PostgreSQL connection details
  });

  fastify.register(session, {
    secret: process.env.SESSION_SECRET,
    cookie: {
      secure: false, // Set to true if using HTTPS
      // maxAge: 24 * 60 * 60 * 1000, // Session expiration time (in milliseconds)
      maxAge: 60000,
      expires: new Date(Date.now() + 60000),
    },
    saveUninitialized: false,
    sameSite: true,
    store: new pgSession({
      pool,
      tableName: 'sessions', // Name of the session table in the database
      createTableIfMissing: false, // Disable table creation if missing
    }),
  });

  // fastify.decorate('updateTokenExpiry', async function (req, reply, done) {
  //   if (req.session && req.session.cookie && req.session.cookie.expires) {
  // 		const sessionRecord = new Date(req.session.cookie.expires);
  // 		const sessionExpirationTime = sessionRecord.getTime();
  // 		const currentTime = Date.now();
  // 		console.log(sessionExpirationTime);
  // 		console.log(currentTime)

  //     console.log(currentTime > sessionExpirationTime);
  //     if (currentTime >= sessionExpirationTime) {
  //       // Session has expired
  //       // Handle the expired session scenario
  // 			console.log('Session Expired, Unauthorized')
  //       reply.code(401).send({ message: 'Session Expired, Unauthorized' });
  //     } else {
  //       // Session is still active
  //       // Proceed with the protected route logic
  //       // ...
  //       // reply.code(200).send({ message: 'Session is Still Active' });
  //     }
  //   } else {
  //     // Session information not available or missing expiration time
  //     // Handle the scenario accordingly
  //     res.redirect('/login');
  //   }
  // });

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
};
// const fastifyPlugin = require('fastify-plugin');
// const session = require('fastify-session');

// const sessionConnect = async (fastify, opts) => {

// }

module.exports = fastifyPlugin(sessionConnect);
