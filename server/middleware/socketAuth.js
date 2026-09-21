const jwt = require('jsonwebtoken');
require('dotenv').config();

function authenticateSocketToken(socket, next) {
  const token = socket.handshake.auth.token;
  
  if (!token) {
    next(new Error("Missing token."));
  }
  
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, 
    (err, decoded) => {
      if (err) next(new Error("Authentication failed."));
      socket.data.user = decoded.email;
      next();
  });
}

module.exports = { authenticateSocketToken };