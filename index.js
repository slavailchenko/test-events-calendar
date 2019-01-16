const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

const usersRouter = require('./routes/users.route');
const eventsRouter = require('./routes/events.route');

const config = require('./config/app.config');
const log = require('./services/log.service')(module);
const ServerError = require('./libs/errors');
const mongoose = require('./libs/mongoose');

let app;

mongoose.connect().then(()=> new Promise ((res, rej) => {

  app = express ();
  app.use(bodyParser.json({limit: "50mb"}));
  app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:500}));
  app.use(cors());
  app.use(expressValidator());

  app.disable('x-powered-by');

  // app.use(express.static(path.resolve(__dirname, '../../client/build')));

  app.use('/api/v1/users', usersRouter);
  app.use('/api/v1/events', eventsRouter);

  // app.get('*', (req, res) => {
  //   res.sendFile(path.resolve(__dirname, '../../client/build/index.html'));
  // });

  app.use(ServerError.handle404Error);
  app.use(ServerError.errorLogger);
  app.use(ServerError.errorHandler);

  app.listen(config.server.port, config.server.host, err => {
    if (err) {
      log.error(`Server creation error: ${err}`);
      return;
    }
    log.info(`server started on ${config.server.host}:${config.server.port}`);
  });
  res();
})
)
.catch((err) => log.error(err.message));