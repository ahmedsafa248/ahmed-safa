const mongoose = require('mongoose');
const { schema } = require('./Courses');
const Questions = require('./Questions');
const User = require('./User');

const Schema = mongoose.Schema;
const ExercisesSchema = new Schema({
  Title:{
    type: String,
    required: true
  },

 Questions:{
  type: Array
 },
  
  Courseid:{
    
     type: mongoose.Schema.Types.ObjectId,
    ref:'Course',
  },
  instructorid:{
    
    type: mongoose.Schema.Types.ObjectId,
   ref:'User',
 }
}
, { timestamps: true });

const Exercises = mongoose.model('Exercises',ExercisesSchema );

module.exports = Exercises;
