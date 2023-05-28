const User = require('../../model/user');

const getUsersOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        users: User,
      },
    },
  },
};

const setUserOpts = {
  schema: {
    body: {
      type: 'object',
      //This will make the name field required in the body
      //It gives 400 bad request when name is not passed
      required: ['username', 'password', 'email'],
      properties: {
        username: { type: 'string' },
        password: { type: 'string' },
        email: { type: 'string' },
      },
    },
    response: {
      200: User,
    },
  },
};

const deleteUserOpts = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
};

const updateUserOpts = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
};

const getUserOpts = {
  schema: {
    response: {
      200: User,
    },
  },
};

module.exports = {
  getUsersOpts,
  setUserOpts,
  deleteUserOpts,
  updateUserOpts,
  getUserOpts,
};
