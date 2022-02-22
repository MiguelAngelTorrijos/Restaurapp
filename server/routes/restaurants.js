const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { fieldsValidator } = require('../middlewares/fieldsValidator');

const {
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  createRestaurant,
} = require('../controllers/restaurants.controllers');

router.get('/:id', getRestaurantById);
router.get('/', getAllRestaurants);
router.put(
  '/:id',
  [
    check('name', 'The name is required').not().isEmpty(),
    check('neighborhood', 'The email is required').not().isEmpty(),
    check('id', 'The email is required').not().isEmpty().isNumeric(),
    fieldsValidator,
  ],
  updateRestaurant
);
router.post(
  '/',
  [
    check('name', 'The name is required').not().isEmpty(),
    check('neighborhood', 'The email is required').not().isEmpty(),
    check('id', 'The email is required').not().isEmpty().isNumeric(),
    fieldsValidator,
  ],
  createRestaurant
);
router.delete('/:id', deleteRestaurant);

module.exports = router;
