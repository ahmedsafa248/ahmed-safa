// External variables
const express = require("express");
const mongoose = require('mongoose');

// THIS IS WRONG NEVER DO THAT !! Only for the task we put the DB Link here!! NEVER DO THAAAT AGAIN !!
//Check db connection links in README file
const MongoURI = 'mongodb+srv://safa248:safa248@safa.jp13nsy.mongodb.net/user' ;



//App variables
const app = express();
const port = process.env.PORT || "8000";
const cors= require('cors');
const user = require('./Models/User');
const course = require('./Models/Courses');
const sendEmail= require('./Models/sendEmail');
const env= require("dotenv").config();
// #Importing the userController

//const userController = require('./Routes/userController');
const adminController = require('./Routes/adminController');
const individualController = require('./Routes/individualController');

const instructorController = require('./Routes/instructorController');

const corporateController = require('./Routes/corporateController');

const guestController = require('./Routes/guestController');

const userController= require('./Routes/userController');


// configurations
// Mongo DB
mongoose.connect(MongoURI)
.then(()=>{
  console.log("MongoDB is now connected!")
// Starting server
 app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  })
})
.catch(err => console.log(err));
/*
                                                    Start of your code
*/
app.get("/home", (req, res) => {
    res.status(200).send("You have everything installed!");
  });
  
  app.use(express.json());
  app.use (express.urlencoded({extended: false}));
  //app.use(express);
app.use(cors());
  //app.use(userController);
  app.use(adminController);
  app.use(guestController);
  app.use(corporateController);
  app.use(individualController);
  app.use(instructorController);
  app.use(userController);
 
// #Routing to userController here




/*
                                                    End of your code
*/

