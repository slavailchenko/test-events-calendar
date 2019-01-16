module.exports = {

    server: {
        port: process.env.PORT || 8081,
        host: process.env.HOST || '127.0.0.1',
    },
    authToken: {
        tokenExpirationTimeSec: 30000,
        version: 1,
        secretKey: process.env.SECRETKEY || '0a6b944d-d2fb-46fc-a85e-0295c986cd9f',
    },
    database: {
        uri: process.env.URI_DB || 'mongodb://localhost:27017/events',
        promise: Promise,
        options: {
            useNewUrlParser: true,
            useCreateIndex : true
        }
    }
};