const _ = require('lodash');
const log = require('../services/log.service')(module);
const ServerError = require('../libs/errors');
const { check, validationResult } = require('express-validator/check');

const eventsModel = require('../models/events.model');
const usersModel = require('../models/users.model');

module.exports = {

  arrayOfValidation: [check('title').not().isEmpty(),
                      check('start').not().isEmpty().trim(),
                      check('duration').not().isEmpty().trim(),
                     ],

  validationFields: (req, res, next) => {  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    } else next();
  },

  newEvent: ({ currentUser, body: { start, duration, title } }, res, next) => {
    eventsModel.create({ start, duration, title })
    .then(eventSaved => {
        usersModel.findById({_id: currentUser._id})
        .then(user => {
            user.events.push (eventSaved._id);
            user.save();
            res.status(201).json({user: user, event: eventSaved})
        })
        .catch(next);
    })
    .catch(next);
  },

  removeEvent: ({ currentUser, params: { id } }, res, next) => {
    usersModel.findById({_id: currentUser._id})
    .then(user => {
        if (!user.events) throw new ServerError(404, 'Events not found');
        eventsModel.findByIdAndRemove(id)
        .then(event => {
            user.events.splice(user.events.findIndex(eventId => eventId === event._id), 1);
            // _.remove(user.events, eventId => eventId === event._id);
            user.save();
            console.log(user.events);
            res.status(200).json(`Event with id=${id} deleted from ${user.name}`);
        })
        .catch(next)
    })
    .catch(next);
  }

}