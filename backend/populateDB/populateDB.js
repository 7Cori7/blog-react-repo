require("dotenv").config();
const mongoose = require('mongoose');

//const AboutPage = require('../models/About');
const Article = require('../models/Articles');
//const HomePage = require('../models/Home');

const { articles } = require('./articles-data');
//const { homedata } = require('./home-data');
//const { aboutdata } = require('./about-data');

const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connection established"))
  .catch((err) => console.error("MongoDB connection error:", err));


const importData = async () => {

    try{
  
      await Article.deleteMany(); // Optional: clear the collection before insertion
      await Article.insertMany(articles);
      console.log("Data successfully imported to MongoDB!");
      mongoose.disconnect();
  
    }catch(error){
  
      console.error("Error importing data:", error);
      mongoose.disconnect();
    }
  };
  
importData();

//* PARA QUE FUNCIONE Y SE EJECUTE EL CODIGO, PRIMERO UBICARSE EN LA CARPETA, LUEGO, ESCRIBIR EN LA CONSOLA:
//* node populateDB.js