const JWT = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


function verifyToken(req, res, next) {
    var token = req.headers['x-access-token'];

    if (!token)
        return res.status(403).send({ 
            success: false, 
            message: 'No token provided.' 
        });
    
    JWT.verify(token, process.env.SECRET_KEY, function(err, decoded) {
        if (err)
        return res.status(500).send({ 
            success: false, 
            message: 'Failed to authenticate token.' 
        });
      
    // if everything good, save to request for use in other routes
    req.username = decoded.id;
    next();
  });
}

module.exports =  verifyToken;