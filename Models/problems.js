const mongoose = require('mongoose');
const Courses = require('./Courses');
const { schema } = require('./User');
//const { schema } = require('./Instructor');
const Schema = mongoose.Schema;
const problemSchema = new Schema({
  
  Courseid:{
    
    type: mongoose.Schema.Types.ObjectId,
    ref:'Courses',
  },

  traineeid:{
    
    type: mongoose.Schema.Types.ObjectId,
   ref:'User',
 },

 type:{
    
   type: String,
   
 },



 problems: {
    type: String,
    
    
  }
  
}
, { timestamps: true });

const trouble= mongoose.model('problem',problemSchema);

module.exports = trouble;