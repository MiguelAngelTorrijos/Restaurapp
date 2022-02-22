const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const users = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, '../mocks/users.mock.json'))
    );

    let index = users.findIndex((i) => i.username === username);

    if (index === -1)
      return res.status(400).json({ error: 'The provided data is invalid' });

    const user = users[index];

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ error: 'The provided data is invalid' });

    const token = jwt.sign(
      {
        name: user.name,
        id: user.id,
      },
      process.env.TOKEN_SECRET
    );

    delete user.username;
    delete user.password;

    return res.header('Authorization', token).json({
      error: null,
      data: { token, user },
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  loginUser,
};
