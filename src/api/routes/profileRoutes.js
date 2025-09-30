const express = require('express');

const router = express.Router();

const authenticateToken = require('../authMiddleware');

router.get('/profile', authenticateToken, (req, res) => {
  res.json({ message: `Привет! ${req.user.userLogin}`, user: req.user });
});

module.exports = router;
