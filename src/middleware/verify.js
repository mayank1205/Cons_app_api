const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    var token = req.headers['authorization'];
    console.log('token ', token)
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    token = token.split(' ')[1];
    jwt.verify(token, process.env.TOKEN_KEY, function(err, decoded) {
      if (err) return res.status(401).send({ auth: false, message: 'Invalid token.' });
      req.username = decoded.username;
      req.usermobile = decoded.mobile;
      req.userid = decoded.userid;
      next();
    });
}
module.exports = verifyToken;

