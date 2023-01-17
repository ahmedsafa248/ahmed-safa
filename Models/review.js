const mongoose = require('mongoose');
const Courses = require('./Courses');
//const { schema } = require('./User');
//const { schema } = require('./Instructor');
const Schema = mongoose.Schema;
const reviewcourseSchema = new Schema({
  
  Courseid:{
    
     type: mongoose.Schema.Types.ObjectId,
    ref:'Courses',
  },



  review: {
    type: String,
    required:true,
    
  }
}
, { timestamps: true });

const rev_C= mongoose.model('review',reviewcourseSchema);

module.exports = rev_C;