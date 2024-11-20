const jwt = require('jsonwebtoken');

// Hardcoded JWT Secret Key (replace with a secure key for production)
const secretKey = 'your_jwt_secret_key';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  // Check if the header is present and starts with 'Bearer'
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log("Authorization header missing or malformed");
    return res.status(403).send({ message: 'Token required or malformed' });
  }

  // Extract the token by removing 'Bearer ' prefix
  const token = authHeader.split(' ')[1];

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      console.log("Token verification failed:", err);
      return res.status(403).send({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    console.log("Authorizing role for user:", req.user?.role);
    if (!roles.includes(req.user.role)) {
      console.log("Access denied for role:", req.user.role);
      return res.status(403).send({ message: 'Access denied' });
    }
    next();
  };
};

module.exports = { authenticateToken, authorizeRoles };
