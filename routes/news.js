const express = require('express');
const router = express.Router();
const News = require('../models/news');

router.post('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, password } = req.body;
        if(password === process.env.SPECIAL_PASSWORD){
            const news = await News.findByIdAndUpdate(id, {
                title, description
            }, { 
                new: true,
                upsert: true
            });
            console.log(news);
            res.render('news/edit', { news });
        }else{
            res.redirect(`/articles/${id}`);
        }
    } catch (err) {
        console.log(err);
        res.redirect(`/articles/${id}`);
    }
});

router.get('/new', (req, res) => {
    res.render('news/new');
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await News.findByIdAndDelete(id);
        res.redirect('/articles');
    } catch (err) {
        console.log(err);
        res.redirect('/articles');
    }
})

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