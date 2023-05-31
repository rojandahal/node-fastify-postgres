const crypto = require('crypto');

//Login User
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
        // const token = req.server.jwt.sign({
        //   id: row.id,
        //   username: row.username,
        // });
				console.log("Login Successful")
        req.session.userId = row.id;
        // Set the token as a cookie
        // reply.setCookie('token', token, {
        //   expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // Expires in 24 hours
        // });
        reply.code(200).send({ 'Login Successful': req.session.user, 'SessionId': req.session });
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

//Logout User
const logoutUser = async (request, reply) => {
  // Delete the session from the session store
  try {
    await request.session.destroy();
    // Clear the token and session cookie on the client-side
    reply.clearCookie('sessionId');
    reply.clearCookie('token', { domain: 'localhost', path: '/api/v1' });
    reply.code(200).send({ 'Logout Successful': 'Logged out' });
    return;
  } catch (error) {
    console.error('Error deleting session:', error);
    reply.send({ error: 'An error occurred during logout' });
  }
};

module.exports = { loginUser, logoutUser };
