const express = require('express');
const router = express.Router();
const News = require('../models/news');

router.get('/', async (req, res) => {
    try {
        const news = await News.find({});
        res.render('admin/index', { news });
    } catch (err) {
        console.log(err);
        res.redirect('/admin');
    }
});

module.exports = router;