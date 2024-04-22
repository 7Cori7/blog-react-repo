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
const Users = require('../models/User');

app.use(express.json());
app.use(cors());

// MongoDB connection string:
const mongoURI = process.env.MONGO_URI;
mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));


// Create new user endpoint  
app.post('/api/create/user', async (req, res) => {

    const { email, name } = req.body;

    try {

        if(email && name){

            await Users.create(req.body);

            return res.status(200).json({message:'New user created!'});

        }else if(await Users.findOne({email: email})){

            return res.sendStatus(400).json({error:'The user already exist'});
        }else{

            return res.sendStatus(400);
        }
        
    } catch (error) {

        return res.sendStatus(400);
    }
});

// Get users endpoint:
app.get('/api/get/users', async (req, res)=>{

    try {

        const userList = await Users.find();

        return res.status(200).json({ok:true, data:userList});
        
    } catch (error) {

        return res.sendStatus(400);
    }
});

// Get all articles info:
app.get('/api/articles-info', async (req,res) => {

    try {

        const articleList = await Article.find();

        return res.status(200).json({ok:true, data:articleList});
        
    } catch (error) {

        return res.sendStatus(400);
    }
});

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
    const {user} = req.body;

    try {

        let updateArticle;

        if(await Article.findOne({name: name, users: user})){

            updateArticle = await Article.findOneAndUpdate({name: name}, {$inc: {votes: -1}, $pull: {users: user}});
            
            await updateArticle.save();

            return res.status(200).json({ updateArticle });

        }else{

            updateArticle = await Article.findOneAndUpdate({name: name}, {$inc: {votes: 1}, $push: {users: user}});

            await updateArticle.save();

            return res.status(200).json({ updateArticle });
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

        if(!user || !name) return res.sendStatus(400);

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