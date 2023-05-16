const jwt = require('jsonwebtoken');
const User = require('./user');

// Middleware function to authenticate user requests
const auth = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      throw new Error();
    }
    console.log(authHeader)

    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.id });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Authentication required' });
  }
};


module.exports = auth;