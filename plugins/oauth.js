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
    callbackUriParams: {
      // custom query param that will be passed to callbackUri
      access_type: 'offline', // will tell Google to send a refreshToken too
    },
  });

  function isGoogleTokenExpired(token) {
    const currentTime = new Date(); // Convert to seconds
    const expirationTime = new Date(token.expires_at);
    return currentTime > expirationTime;
  }

  fastify.decorate('authenticate', async function (req, reply, done) {
    const user = req.session.user;
    if (user === undefined) {
      reply.code(401).send({ error: 'Unauthorized User' });
      return done();
    }
    if (isGoogleTokenExpired(user)) {
      req.server.googleOAuth2.getNewAccessTokenUsingRefreshToken(
        req.session.user,
        {
          scope: ['profile', 'email'],
        },
        (err, accessToken) => {
          if (err) {
            reply.send(err);
            return;
          }
          const refresh_token = req.session.user.refresh_token;
          const newToken = {
            ...accessToken.token,
            refresh_token: refresh_token,
          };
          req.session.user = newToken;
          reply.redirect('http://localhost:3000/api/v1/users/google/me');
        },
      );
      done();
    }
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
