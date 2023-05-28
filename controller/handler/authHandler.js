const crypto = require('crypto');

const loginUser = async (req, reply) => {
  const { username, password } = req.body;
  const userModel = req.server.user;
  const hash = crypto.createHash('sha256');
  hash.update(password);
  const hashedPw = hash.digest('hex');

  try {
    const row = await userModel.findOne({ where: { username: username } });
    if (row) {
      if (row.password === hashedPw) {
        const token = req.server.jwt.sign(row);
        // Set the token as a cookie
        reply.setCookie('token', token, {
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // Expires in 24 hours
        });
        reply.code(200).send({ 'Login Successful': token });
      } else {
        reply.status(401).send('Wrong Password');
      }
    } else {
      reply.status(404).send('User Not found');
    }
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const logoutUser = async (req, reply) => {
  reply.clearCookie('token', { path: '/' });
  reply.code(200).send({ 'Logout Successful': 'Logged out' });
};

module.exports = { loginUser, logoutUser };
