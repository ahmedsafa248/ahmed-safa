const mongoose = require('mongoose');
const { schema } = require('./Courses');
//const Questions = require('./Questions');
const User = require('./User');
const Excercises = require('./Exercises');

const Schema = mongoose.Schema;
const usersubmitSchema = new Schema({

 Questions:{
  type: Array
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

const usersubmit = mongoose.model('usersubmit',usersubmitSchema );

module.exports = usersubmit;