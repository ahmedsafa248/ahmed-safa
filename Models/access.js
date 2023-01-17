const mongoose = require('mongoose');
const Courses = require('./Courses');
const { schema } = require('./User');
//const { schema } = require('./Instructor');
const Schema = mongoose.Schema;
const accessSchema = new Schema({
  
  Courseid:{
    
    type: mongoose.Schema.Types.ObjectId,
    ref:'Courses',
  },

  username: {
    type: String,
    
    
  },

  traineeid:{
    
   type: mongoose.Schema.Types.ObjectId,
   ref:'User',
 },

 Cname: {
    type: String,
    
    
  }
  
}
, { timestamps: true });

const access_in= mongoose.model('access',accessSchema);

module.exports = access_in;