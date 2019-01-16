const jwt = require('jsonwebtoken');
const config = require('../config/app.config');
const ServerError = require('../libs/errors');
const tokenJWT = require('../services/jwt.service');
const log = require('../services/log.service')(module);

module.exports = {

    checkToken: (req, res, next) => {

        const token = req.headers.authorization;
        console.log(token);

        if (!token) 
            return next(new ServerError(401, 'No authorization token was found'));

        tokenJWT.verifyToken(req.headers.authorization)
        .then(decoded => {
            if (!decoded) {
                return next(new ServerError(401, `Token is invalid`))
            } else {
                req.currentUser = decoded;
                log.info(`User ${req.currentUser.name} logged in with token: ${token}`); 
                next();
            } 
        })
        .catch(next);
    }
}