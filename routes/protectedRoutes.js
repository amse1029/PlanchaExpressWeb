const express = require('express');
const verifyToken = require('./middleware/verifyToken');

const router = express.Router();

router.get('/protected-route', verifyToken, (req, res) => {
    res.json({ message: 'Acceso permitido', user: req.user });
});

module.exports = router;
