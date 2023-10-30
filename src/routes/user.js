const express = require('express');
const router = express.Router();
const { updateUserValidator } = require("../controllers/validators/validator");
const { validationResult } = require('express-validator');
const userController = require('../controllers/userController');



router.route('/update_profile/:id').post(updateUserValidator, userController.user_update);

/*  router.post('/update_profile/:id',updateUserValidator, (req, res, next) => {
    const errorsSignup = validationResult(req)
    if (!errorsSignup.isEmpty()) {
      req.flash('message', errorsSignup.errors[0].msg);
      res.redirect('/profile');
    }
  });  */


module.exports = router;