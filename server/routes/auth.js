const { Router } = require('express');
const { check } = require('express-validator');
const { fieldsValidator } = require('../middlewares/fieldsValidator');

const router = Router();

const { loginUser } = require('../controllers/auth');

router.post(
  '/',
  [
    check('username', 'The email is required').not().isEmpty(),
    check(
      'password',
      'The password must contain at least 6 characters'
    ).isLength({ min: 6 }),
    fieldsValidator,
  ],
  loginUser
);

module.exports = router;
