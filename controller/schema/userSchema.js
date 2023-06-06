const User = require('../../model/user');
const Joi = require('joi');
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

// const setUserOpts = {
//   schema: {
//     body: {
//       type: 'object',
//       //This will make the name field required in the body
//       //It gives 400 bad request when name is not passed
//       required: ['username', 'password', 'email'],
//       properties: {
//         username: { type: 'string' },
//         password: { type: 'string' },
//         email: { type: 'string' },
//       },
//     },
//     response: {
//       200: User,
//     },
//   },
// };

const setUserOpts = {
  body: Joi.object()
    .keys({
      username: Joi.string().alphanum().min(3).max(30).required(),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
      email: Joi.string().pattern(
        new RegExp(
          "/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/",
        ),
      ),
    })
    .required(),
};

const deleteUserOpts = {
  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  },
};

const updateUserOpts = {
  body: Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30).required(),
  }),
  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  },
};

module.exports = {
  getUsersOpts,
  setUserOpts,
  deleteUserOpts,
  updateUserOpts,
};
