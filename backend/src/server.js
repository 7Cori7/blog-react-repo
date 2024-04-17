const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require("http");
const { send } = require('process');

const app = express();
const port = 4000;
const server = http.createServer(app);
require("dotenv").config();

const AboutPage = require('../models/About');
const Article = require('../models/Articles');
const HomePage = require('../models/Home');

app.use(express.json());
app.use(cors());

// MongoDB connection string:
const mongoURI = process.env.MONGO_URI;
mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));



// Load Article endpoint:
app.get('/api/articles/:name', async (req,res)=>{
    
    const {name} = req.params;

    try{
        const article = await Article.findOne({name: name});

        if(article){

            return res.status(200).json({ article });
        }else{

            return res.sendStatus(404);
        }

    }catch(error){

        return res.sendStatus(400);
    }
});

// Upvote endpoint:
app.put('/api/articles/:name/upvote', async (req,res) => {

    const {name} = req.params;

    try {

        const updateArticle = await Article.findOneAndUpdate({name: name},{$inc: {votes: 1}});

        await updateArticle.save();

        if(updateArticle){

            return res.status(200).json({ updateArticle });
        }else{

            return res.sendStatus(404);
        }

    }catch(error){

        return res.sendStatus(400);
    }
});

// Add comments endpoint:
app.post('/api/articles/:name/comments', async (req,res)=>{

    const {user, text} = req.body;
    const {name} = req.params;

    try{

        const article = await Article.findOneAndUpdate({name: name}, {$push: {comments: req.body}});

        await article.save();

        if(article){

            return res.json(article);
        }else{

            return res.send("That article doesn't exist my man");
        }

    }catch(error){

        return res.sendStatus(400);
    }
});

server.listen(port, () => {
    console.log(`Server is listening to port ${port}`);
});