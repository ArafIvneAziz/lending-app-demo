const AuthService = {
  isAdmin: function(req, res, next) {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(403).send('Access denied. User is not an admin.');
    }
  }
};

module.exports = AuthService;
