const express = require('express');
const router = express.Router();
const { updateUserValidator } = require("../controllers/validators/validator");
const { validationResult } = require('express-validator');
const userController = require('../controllers/userController');



router.route('/update_profile/:id').post(updateUserValidator, userController.user_update);


module.exports = router;