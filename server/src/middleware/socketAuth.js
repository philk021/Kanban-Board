import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const authenticateSocketToken = (socket, next) => {
  const token = socket.handshake.auth.token;
  
  if (!token) next(new Error('Unauthorized access'));
  
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, 
    (err, decoded) => {
      if (err) next(new Error('Unauthorized access'));
      socket.data.user = decoded.email;
      next();
  });
};