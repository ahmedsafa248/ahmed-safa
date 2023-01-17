const mongoose = require('mongoose');
const { schema } = require('./Courses');
const { schema } = require('./Exercises');
const { schema } = require('./User');
const Schema = mongoose.Schema;
const TraineeGradeSchema = new Schema({
  Grade:{
    type:String,
    required: false
  },
  
  Courseid:{
    
     type: mongoose.Schema.Types.ObjectId,
    ref:'Course',
  },
  Exerciseid:{
    
    type: mongoose.Schema.Types.ObjectId,
   ref:'Exercises',
 },
 Traineeid:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
 }
}
, { timestamps: true });

const TraineeGrade = mongoose.model('TraineeGrade',TraineeGradeSchema );

module.exports = TraineeGrade;
