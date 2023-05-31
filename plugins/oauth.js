const fastifyPlugin = require('fastify-plugin');
const oauthPlugin = require('@fastify/oauth2');
const sget = require('simple-get');

const oauth = fastifyPlugin(async function (fastify, opts) {
  fastify.register(oauthPlugin, {
    name: 'googleOAuth2',
    scope: ['profile', 'email'],
    credentials: {
      client: {
        id: process.env.GOOGLE_OAUTH_CLIENT_ID,
        secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      },
      auth: oauthPlugin.GOOGLE_CONFIGURATION,
    },
    startRedirectPath: '/api/v1/login/google',
    callbackUri: 'http://localhost:3000/api/v1/login/google/callback',
  });

  fastify.decorate('authenticate', async function (req, reply, done) {
    const user = req.session.user;
    if (user === undefined) {
      reply.code(401).send({ error: 'Unauthorized User' });
      return done();
    }

    done();
  });

  const getUser = async (req, reply) => {
    const user = req.session.user;
    const access_token = user.access_token;

    return new Promise((resolve, reject) => {
      sget.concat(
        {
          url: 'https://www.googleapis.com/oauth2/v2/userinfo',
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + access_token,
          },
          json: true,
        },
        function (err, res, data) {
          if (err) {
            reject(err);
            return;
          }
          resolve(data);
        },
      );
    });
  };

  fastify.decorate('getUser', getUser);
});

module.exports = oauth;
