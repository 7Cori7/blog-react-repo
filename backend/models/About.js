const mongoose = require('mongoose');

const aboutPageScheema = new mongoose.Schema({
    title: String,
    content: Array,
});

const AboutPage = mongoose.model('AboutPage', aboutPageScheema);

module.exports = AboutPage;