const mongoose = require('mongoose');
const Courses = require('./Courses');
const { schema } = require('./User');
//const { schema } = require('./Instructor');
const Schema = mongoose.Schema;
const enrolledSchema = new Schema({
  
  Courseid:{
    
    type: mongoose.Schema.Types.ObjectId,
    ref:'Courses',
  },

  traineeid:{
    
    type: mongoose.Schema.Types.ObjectId,
   ref:'User',
 },

 Cname: {
    type: String, 
  },
  
  
}
, { timestamps: true });

const enrolled_in= mongoose.model('enrolled',enrolledSchema);

module.exports = enrolled_in;