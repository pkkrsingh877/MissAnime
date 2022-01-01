const express = require('express');
const router = express.Router();
const News = require('../models/news');

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;  
        const news = await News.findById(id);
        res.render('news/show', { news });
    } catch (err) {
        console.log(err);
        res.redirect('/articles');
    }
});

router.get('/', async (req, res) => {
    try {
        const news = await News.find({});
        res.render('news/index', { news });
    } catch (err) {
        console.log(err);
        res.redirect('/articles');
    }
});

module.exports = router;