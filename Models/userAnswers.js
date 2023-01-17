const mongoose = require('mongoose');
const { schema } = require('./Courses');
//const Questions = require('./Questions');
const User = require('./User');
const Excercises = require('./Exercises');

const Schema = mongoose.Schema;
const userAnswersSchema = new Schema({

 Questions:{
  type: Array
 },
  
  Courseid:{
    
     type: mongoose.Schema.Types.ObjectId,
    ref:'Course',
  },
  Userid:{
    
    type: mongoose.Schema.Types.ObjectId,
   ref:'User',
 },
   Exerciseid:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Excercises',
  }

 }

, { timestamps: true });

const userAnswers = mongoose.model('userAnswers',userAnswersSchema );

module.exports = userAnswers;
