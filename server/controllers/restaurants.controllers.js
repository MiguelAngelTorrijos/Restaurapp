const fs = require('fs');
const path = require('path');

const getAllRestaurants = (req, res) => {
  try {
    return res.send(readRestaurantFile());
  } catch (e) {
    console.log(e);
  }
};

const getRestaurantById = (req, res) => {
  try {
    const id = Number(req.params.id);
    const restaurants = readRestaurantFile();
    let restaurant = restaurants.filter((res) => res.id === id);
    return res.send(
      restaurant.length
        ? restaurant
        : 'The requested restaurants does not exists'
    );
  } catch (e) {
    console.log(e);
  }
};

const updateRestaurant = (req, res) => {
  try {
    const id = Number(req.params.id);
    const body = req.body;
    let restaurants = readRestaurantFile();
    let index = restaurants.findIndex((i) => i.id === id);

    if (index !== -1) {
      restaurants[index] = { id, ...body };
      updateRestaurantFile(restaurants);
      return res.status(201).send(restaurants[index]);
    } else {
      return res
        .status('400')
        .send('The requested restaurants does not exists');
    }
  } catch (e) {
    console.log(e);
  }
};

const deleteRestaurant = (req, res) => {
  try {
    const id = Number(req.params.id);
    let restaurants = readRestaurantFile();
    let index = restaurants.findIndex((i) => i.id === id);

    if (index !== -1) {
      restaurants.splice(index, 1);
      updateRestaurantFile(restaurants);
      return res
        .status(200)
        .send(`Restaurant with id ${id} was successfully deleted`);
    } else {
      return res
        .status('400')
        .send('The requested restaurants does not exists');
    }
  } catch (e) {
    console.log(e);
  }
};

const createRestaurant = (req, res) => {
  try {
    const body = req.body;
    body.id = Number(body.id);
    const id = body.id;
    let restaurants = readRestaurantFile();
    let index = restaurants.findIndex((i) => i.id === id);

    if (index === -1) {
      restaurants.push(body);
      updateRestaurantFile(restaurants);
      return res
        .status(200)
        .send(`Restaurant with id ${id} was successfully created`);
    } else {
      return res
        .status('400')
        .send(`The restaurant with id ${id} already exists`);
    }
  } catch (e) {
    console.log(e);
  }
};

const readRestaurantFile = () => {
  return JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../mocks/restaurants.mock.json'))
  );
};

const updateRestaurantFile = (json) => {
  fs.writeFileSync(
    path.resolve(__dirname, '../mocks/restaurants.mock.json'),
    JSON.stringify(json)
  );
};

module.exports = {
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  createRestaurant,
};
