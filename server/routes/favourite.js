const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const {
  getFavourites,
  deleteFavourite,
  addFavourite,
} = require('../controllers/favourite.controllers');
const { check } = require('express-validator');
const { fieldsValidator } = require('../middlewares/fieldsValidator');

router.get('/', verifyToken, getFavourites);
router.post(
  '/',
  verifyToken,
  [
    check('favourites', 'The favourites is required').not().isEmpty().isArray(),
    fieldsValidator,
  ],
  addFavourite
);
router.delete('/:id', verifyToken, deleteFavourite);

module.exports = router;
