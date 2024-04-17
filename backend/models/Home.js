const mongoose = require('mongoose');

const homePageScheema = new mongoose.Schema({
    title: String,
    content: Array,
});

const HomePage = mongoose.model('HomePage', homePageScheema);

module.exports = HomePage;