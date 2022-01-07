const express = require('express');
const router = express.Router();
const News = require('../models/news');

router.get('/:slug', async (req, res) => {
    try {
        const { slug } = req.params;  
        const news = await News.findOne({ slug: slug });
        console.log(news);
        res.render('news/show', { news });
    } catch (err) {
        console.log(err);
        res.redirect('/articles');
    }
});

router.get('/', async (req, res) => {
    try {
        const news = await News.find({});
        console.log(news);
        res.render('news/index', { news });
    } catch (err) {
        console.log(err);
        res.redirect('/articles');
    }
});

module.exports = router;