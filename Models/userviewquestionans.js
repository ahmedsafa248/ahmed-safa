const mongoose = require('mongoose');
const { schema } = require('./Courses');
const User = require('./User');
const Excercises = require('./Exercises');

const Schema = mongoose.Schema;
const userviewquestionansSchema = new Schema({

 Questionsans:{
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

const userviewquestionans = mongoose.model('userviewquestionans',userviewquestionansSchema );

module.exports = userviewquestionans;
