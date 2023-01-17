const mongoose = require('mongoose');
const Courses = require('./Courses');
const { schema } = require('./User');
//const { schema } = require('./Instructor');
const Schema = mongoose.Schema;
const ratingcourseSchema = new Schema({
  
  Courseid:{
    
     type: mongoose.Schema.Types.ObjectId,
    ref:'Courses',
  },

  traineeid:{
    
    type: mongoose.Schema.Types.ObjectId,
   ref:'User',
 },

  rating: {
    type: Number,
    required:true,
    
  }
}
, { timestamps: true });

const rate_C= mongoose.model('ratecourse',ratingcourseSchema);

module.exports = rate_C;