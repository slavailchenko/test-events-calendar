const _ = require('lodash');
const log = require('../services/log.service')(module);
const ServerError = require('../libs/errors');
const { check, validationResult } = require('express-validator/check');

const eventsModel = require('../models/events.model');

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

  newEvent: ({ user, body: { start, duration, title } }, res, next) => {
    eventsModel.create({ start, duration, title })
    .then(eventSaved => {
        user.events.push (eventSaved._id);
        user.save();
        res.status(201).json({user: user, event: eventSaved})
    })
    .catch(next);
  },

  removeEvent: ({ user, params: { id } }, res, next) => {
    eventsModel.findByIdAndRemove(id)
    .then(event => {
      if (!event) throw new ServerError(404, 'Event not found');
      _.remove(user.events, eventId => eventId === event._id);
      user.save();
      res.status(200).json(`Event with id=${id} deleted`);
    })
    .catch(next);
  }

}