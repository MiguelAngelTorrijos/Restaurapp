const fs = require('fs');
const path = require('path');

const getFavourites = (req, res) => {
  try {
    const users = userInfo();
    const user = users.find((user) => (user.id = req.user.id));
    return res.send(user.favourites);
  } catch (e) {
    console.log(e);
  }
};

const addFavourite = (req, res) => {
  try {
    console.log(req.body);
    const { favourites } = req.body;
    const users = userInfo();
    let index = users.findIndex((user) => (user.id = req.user.id));
    users[index].favourites = favourites;
    updateUserInfo(users);
    return res.send(users[index].favourites);
  } catch (e) {
    console.log(e);
  }
};

const deleteFavourite = (req, res) => {
  try {
    const favouriteId = Number(req.params.id);
    const users = userInfo();
    let index = users.findIndex((user) => (user.id = req.user.id));
    let favouriteIndex = users[index].favourites.findIndex(
      (i) => i === favouriteId
    );
    if (favouriteIndex !== -1) {
      users[index].favourites.splice(favouriteIndex, 1);
      updateUserInfo(users);
      return res
        .status(200)
        .send(`Favourite with id ${favouriteId} was successfully deleted`);
    }

    return res.status('400').send('The requested favourite does not exists');
  } catch (e) {
    console.log(e);
  }
};

const userInfo = () => {
  return JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../mocks/users.mock.json'))
  );
};

const updateUserInfo = (json) => {
  fs.writeFileSync(
    path.resolve(__dirname, '../mocks/users.mock.json'),
    JSON.stringify(json)
  );
};

module.exports = {
  getFavourites,
  addFavourite,
  deleteFavourite,
};
