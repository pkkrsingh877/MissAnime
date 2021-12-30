const express = require('express');
const router = express.Router();
const News = require('../models/news');

router.get('/', (req, res) => {
    res.render('admin/index');
});

module.exports = router;