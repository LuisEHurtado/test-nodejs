const passport = require('passport');
const pool = require('../services/database');
const helpers = require('./helpers');
const { validationResult } = require('express-validator');

exports.user_update = async  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('message', errors.errors[0].msg);
        res.redirect('/profile');
    }else{
        const { id } = req.params;
        const  user  = req.body;
        const userFields = {
            username:user.username,
            first_name:user.firstName,
            last_name:user.lastName,
        };
        // VALIDANDO QUE LA CONTRASEÑA NO ESTE VACIA
        if (user.password !=="") { 
            userFields.password = await helpers.encryptPassword(user.password);
        }
        await pool.query('UPDATE users set ? WHERE id = ?', [userFields, id]);
        req.flash('success', 'Perfil actualizado exitosamente');
        res.redirect('/profile'); 
    }
   
  };
