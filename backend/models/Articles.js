const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    name: String,
    title: String,
    content: Array,
    votes: Number,
    comments: Array,
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;