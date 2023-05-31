'use strict';
module.exports = async function (fastify, opts) {
  fastify.get('/login/google/callback', function (req, reply) {
    this.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(
      req,
      (err, result) => {
        if (err) {
          reply.send(err);
          return;
        }
        req.session.user = result;
        reply.redirect('http://localhost:3000/api/v1/users');
      },
    );
  });
};
