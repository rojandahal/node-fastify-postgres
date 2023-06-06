const User = require('../../model/user');
const Joi = require('joi');

const loginOpts = {
  body: Joi.object()
    .keys({
      username: Joi.string().alphanum().min(3).max(30).required(),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    })
    .required(),
};
module.exports = { loginOpts };
