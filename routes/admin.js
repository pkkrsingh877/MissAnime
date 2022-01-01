const express = require('express');
const router = express.Router();
const News = require('../models/news');

router.post('/articles/edit/:id', async (req, res) => {
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
            res.render('admin/edit', { news });
        }else{
            res.redirect(`/admin/articles`);
        }
    } catch (err) {
        console.log(err);
        res.redirect(`/admin/articles`);
    }
});

router.get('/articles/edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const news = await News.findById(id);
        res.render('admin/edit', { news });
    } catch (err) {
        console.log(err);
        res.redirect(`/articles/${id}`);
    }
});

router.post('/articles', async (req, res) => {
    try {
        const { title, description, password } = req.body;
        if (password == process.env.SPECIAL_PASSWORD) {
            let news = await News.create({
                title: title,
                description: description
            });
            res.redirect('/admin/articles');
        } else {
            res.render('news/message');
        }
    } catch (err) {
        console.log(err);
        res.redirect('/admin/articles');
    }
});

router.get('/articles/new', (req, res) => {
    res.render('admin/new');
});

router.delete('/articles/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await News.findByIdAndDelete(id);
        res.redirect('/admin/articles');
    } catch (err) {
        console.log(err);
        res.redirect('/admin/articles');
    }
});

router.get('/articles', async (req, res) => {
    try {
        const news = await News.find({});
        res.render('admin/index', { news });
    } catch (err) {
        console.log(err);
        res.redirect('/admin');
    }
});

router.get('/', (req, res) => {
    res.redirect('/admin/articles');
});

module.exports = router;