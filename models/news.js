const mongoose = require('mongoose');

//defining a schema
const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    }
});

//defining a model
const News = new mongoose.model('News', newsSchema);

module.exports = News;