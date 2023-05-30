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
      maxAge: 24 * 60 * 60 * 1000, // Session expiration time (in milliseconds)
    },
    saveUninitialized: false,
    sameSite: true,
    store: new pgSession({
      pool,
      tableName: 'sessions', // Name of the session table in the database
    }),
  });
};

// const fastifyPlugin = require('fastify-plugin');
// const session = require('fastify-session');

// const sessionConnect = async (fastify, opts) => {

// }

module.exports = fastifyPlugin(sessionConnect);
