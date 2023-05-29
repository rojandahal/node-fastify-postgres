const crypto = require('crypto');

const setUser = async (req, reply) => {
  const fastify = req.server;
  const userModel = fastify.user;
  const user = req.body;
  const hash = crypto.createHash('sha256');

  hash.update(user.password);
  const hashedPw = hash.digest('hex');
  user.password = hashedPw;

  try {
    const row = await userModel.create(user);
    const token = req.server.jwt.sign(row);
    // Set the token as a cookie
    reply.setCookie('token', token, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // Expires in 24 hours
    });
    reply.code(200).send({ row, token });
  } catch (error) {
    console.error(error);
    throw new Error(error.errors[0].message);
  }
};

const getUsers = async (req, reply) => {
  const token = req.cookies.token;
  if (!token) {
    reply.code(401).send({ error: 'Unauthorized' });
  }
  const fastify = req.server;
  const userModel = fastify.user;
  try {
    const users = await userModel.findAll();
    return users;
  } catch (error) {
    console.error(error);
    throw new Error(error.errors[0].message);
  }
};

const updateUsers = async (req, reply) => {
  const { id } = req.params;
  const fastify = req.server;
  try {
    const user = await fastify.user.findByPk(id);
    user === null
      ? reply.status(404).send(`User with id ${id} not found`)
      : null;

    const tokenDecoded = await req.server.getUserFromToken(req, reply);

    if (user.username === tokenDecoded.dataValues.username) {
      const updatedUser = { username: req.body.username };
      await user.update(updatedUser);
      const token = req.server.jwt.sign(user);
      // Set the token as a cookie
      reply.setCookie('token', token, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // Expires in 24 hours
      });

      reply.code(200).send({ 'User Updated': user });
    }
    reply.code(401).send({ Unauthorized: 'Unauthorized' });
  } catch (error) {
    console.error(error);
    throw new Error(error.errors[0].message);
  }
};

const deleteUser = async (req, reply) => {
  const { id } = req.params;
  const fastify = req.server;
  const user = await fastify.user.findOne({ where: { id: id } });
  user === null ? reply.status(404).send(`User with id ${id} not found`) : null;
  const tokenDecoded = await req.server.getUserFromToken(req, reply);

  if (user.username === tokenDecoded.dataValues.username) {
    await user.destroy();
    reply.clearCookie('token', { path: '/' });
    reply.code(200).send(`User with id ${id} Deleted successfully `);
  }
  reply.code(401).send({ Unauthorized: 'Unauthorized' });
};

const getUser = async (req, reply) => {
  const { id } = req.params;
  const fastify = req.server;
  const user = await fastify.user.findByPk(id);
  user === null ? reply.status(404).send(`User with id ${id} not found`) : null;
  const tokenDecoded = await req.server.getUserFromToken(req, reply);

  if (user.username === tokenDecoded.dataValues.username) {
    reply.code(200).send({ user });
  }
  reply.code(401).send({ Unauthorized: 'Unauthorized' });
};
module.exports = { setUser, getUsers, updateUsers, deleteUser, getUser };
