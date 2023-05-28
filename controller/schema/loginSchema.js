const User = require('../../model/user');

const loginOpts = {
  schema: {
    body: {
      type: 'object',
      //This will make the name field required in the body
      //It gives 400 bad request when name is not passed
      required: ['username', 'password'],
      properties: {
        username: { type: 'string' },
        password: { type: 'string' },
      },
    },
    response: {
      200: User,
    },
  },
};

module.exports = { loginOpts };
