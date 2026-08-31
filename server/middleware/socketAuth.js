function authenticateSocketToken(socket, next) {
    const token = socket.handshake.auth;
    
    if (!token) {
        console.log("Unauthorized.");
    }
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, 
        (err, decoded) => {
            if (err) console.log("Invalid token.");
            socket.user = decoded.email;
            next();
    });
}

module.exports = { authenticateSocketToken };