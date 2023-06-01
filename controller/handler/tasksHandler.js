'use strict';

const setTasks = async (req, reply) => {
  const { title, description, status } = req.body;
  const userId = req.session.user.userId;
  const task = await req.server.task.create({
    title,
    description,
    status,
    userId,
  });
  return task;
};
