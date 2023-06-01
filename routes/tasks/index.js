'use strict';

const {
  getTask,
  setTasks,
  updateTasks,
} = require('../../controller/handler/tasksHandler');

module.exports = async function (fastify, opts) {
  fastify.get('/', {
    preValidation: fastify.authenticate,
    handler: getTask,
  });

  fastify.post('/', {
    preValidation: fastify.authenticate,
    handler: setTasks,
  });

  fastify.put('/', {
    preValidation: fastify.authenticate,
    handler: updateTasks,
  });
};
