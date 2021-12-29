const express = require('express');
const app = express();
const mongoose = require("mongoose");
const path = require('path');
const port = process.env.PORT || 3000;
require('dotenv').config();
const ejsMate = require('ejs-mate');
const morgan = require('morgan');
const News = require('./models/news');
const methodOverride = require('method-override');

//middlewares
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));

//setting up ejs
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//connecting to our database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connection Successful!");
    })
    .catch((err) => {
        console.log("Connection Failed!");
        console.log(err);
    });

//routes setup
const newsRoutes = require('./routes/news');
app.use('/articles', newsRoutes);

app.get('/', (req, res) => {
    res.redirect('/articles');
});

app.listen(port, () => {
    console.log('App is listening at port 8000!');
});