const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../model/UserModel');

dotenv.config();

const authMiddleware = async (req, res, next) => {
  try {
    // Get the token from the request headers
    const { authorization } = req.headers;

    // Check if token is present
    if (!authorization) {
      return res.status(401).json({
        message: 'Not Logged In',
      });
    }

    const token = authorization.replace('Bearer ', '');

    // Verify the token
    const payload = jwt.verify(token, process.env.SECRET_KEY);

    // Extract user ID from the payload
    const {userId } = payload;
    console.log(userId)

    // Find the user by ID
    const dbUser = await User.findById(userId);

    if (!dbUser) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Attach the user information to the request for further processing
    req.user = dbUser;
    console.log(req.user);

    // Move to the next middleware or route handler
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Unauthorized - Invalid token' });
  }
};

module.exports = authMiddleware;
