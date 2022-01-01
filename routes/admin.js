const express = require('express');
const router = express.Router();
const News = require('../models/news');

router.delete('/articles/delete/:id', async (req, res) => {
    try {
        const { id } = req.body;
        await News.findByIdAndDelete(id);
        res.redirect('/admin');
    } catch (err) {
        console.log(err);
        res.redirect('/admin');
    }
});

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