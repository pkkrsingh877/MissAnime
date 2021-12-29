const express = require('express');
const app = express();
const mongoose = require("mongoose");
const mongodb = require("mongodb");
const dirname = require('path');
const path = require('path');
const port = process.env.PORT || 8000;
require('dotenv').config();

//serving static files
app.use(express.static(__dirname + '/public'));
app.use('img', express.static(__dirname + '/img'));

//body parser middleware
app.use(express.urlencoded({ extended: true }));

//setting up ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

//connecting to our database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connection Successful!");
    })
    .catch((err) => {
        console.log("Connection Failed!");
        console.log(err);
    });

//defining a schema

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

//defining a model
const News = new mongoose.model('News', newsSchema);

app.get('/articles/new', (req, res) => {
    res.render('new');
});

app.post('/articles/new', (req, res) => {
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

app.get('/articles/:id', async (req, res) => {
    const { id } = req.params;  
    console.log(req.params) 
    const news = await News.findById(id);
    data = news;
    if(news){
      res.render('show', {data});
    }
});

app.get('/articles', (req, res) => {
    News.find({}, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
            res.render('index', { data });
        }
    });
});

app.get('/', (req, res) => {
    res.redirect('/articles');
});

app.listen(port, () => {
    console.log('App is listening at port 8000!');
});