const router = require('express').Router();
const UserController = require('../controllers/user.controller.js');

router.get('/find/:id',UserController.findUserById);

module.exports = router;