const jwt = require('jsonwebtoken');
const config = require('../config.js');

exports.getToken = function(user) {
    return jwt.sign(user, config.secretKey, {
        expiresIn: 3600,
    });
};

exports.verifyUser = function(req, res, next) {
    const token = req.body.token || req.query.token ||
    req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, config.secretKey, function(err, decoded) {
            if (err) {
                const err = {message: 'You are not authenticated!'};
                err.status = 401;
                res.json(err);
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        const err = {message: 'No token provided!'};
        err.status = 403;
        res.json(err);
    }
};
