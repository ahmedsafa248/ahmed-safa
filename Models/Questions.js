const mongoose = require('mongoose');
const { schema } = require('./Courses');
const Exercises = require('./Exercises');

const Schema = mongoose.Schema;
const QuestionsSchema = new Schema({
  Question:{
    type: String,
    required: true
  },
  OptionA:{
    type: String,
    required: true
  },
  OptionB:{
    type: String,
    required: true
  },
  OptionC:{
    type: String,
    required: true
  },
  OptionD:{
    type: String,
    required: true
  },
  Answer:{
    type: String,
    required: true
  },
  
  Courseid:{
    
     type: mongoose.Schema.Types.ObjectId,
    ref:'Course',
  },
  Exerciseid:{
    
    type: mongoose.Schema.Types.ObjectId,
   ref:'Exercises',
 }

}
, { timestamps: true });

const Questions = mongoose.model('Questons',QuestionsSchema );

module.exports = Questions;
