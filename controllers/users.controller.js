const { check, validationResult } = require('express-validator/check');
const _ = require('lodash');
const axios = require('axios');
const log = require('../services/log.service')(module);
const ServerError = require('../libs/errors');
const usersModel = require('../models/users.model');
const tokenJWT = require('../services/jwt.service');

module.exports = {

  arrayOfValidation: [check('email').isEmail().normalizeEmail(),
                      check('name').not().isEmpty().trim(),
                      check('idToken').not().isEmpty().trim()
                      ],

  validationFields: (req, res, next) => {  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    } else next();
  },

  googleLogin: ({ body: { idToken } }, res, next) => {
   
    axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${idToken}`)
    .then(data => {
      usersModel.findOne({email: data.data.email})
      .populate([{
            path: 'events',
            model: 'Event',
            select: '_id title start duration created_at'
        }])
      .then(user => {
        if (!user) {
          usersModel.create({
            email: data.data.email,
            name: data.data.name,
            avatar: data.data.picture.replace('/s96-c/', '/s40-c-mo/')
          });
        };
        
        return tokenJWT.generateToken(_.pick(user, ['_id', 'email', 'name']))
            .then(token => {
              res.status(201).json({
                token,
                events: user.events,
                user: _.pick(user, ['email', 'name', 'avatar'])
              })
            })
            .catch(next)
          })
      .catch(next)
    })
    .catch(next)
  },

  getUserMe: (req, res, next) => {

        if (!req.currentUser) {
            return next(404, 'No current user was found');
        }

        console.log('req.currentUser');
        console.log(req.currentUser);

        usersModel.findOne({_id: req.currentUser._id})
        .populate([{
            path: 'events',
            model: 'Event',
            select: '_id title start duration created_at'
        }])
        .then(result => {
          console.log(result);
           res.status(200).json({
            events: result.events,
            user: _.pick(result, ['email', 'name', 'avatar'])
          })
         })
        .catch(next);
    }
}