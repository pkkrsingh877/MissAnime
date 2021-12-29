const express = require('express');
const router = express.Router();
const News = require('../models/news');

router.post('/new', (req, res) => {
    console.log(req.body);
    const { title, description, password } = req.body;
    console.log(password == process.env.SPECIAL_PASSWORD)
    if (password == process.env.SPECIAL_PASSWORD) {
        let news = new News({
            title: title,
            description: description
        });
        news.save((err, data) => {
            if (err) {
                console.log(err);
            } else {
                // console.log(data);
                res.redirect('/');
            }
        });
    } else {
        res.render('message');
    }
    res.render('message');
});

router.get('/new', (req, res) => {
    res.render('new');
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;  
    console.log(req.params) 
    const news = await News.findById(id);
    if(news){
      res.render('show', { news });
    }
});

router.get('/', (req, res) => {
    News.find({}, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.render('index', { data });
        }
    });
});

module.exports = router;