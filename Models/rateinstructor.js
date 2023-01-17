const mongoose = require('mongoose');
const { schema } = require('./User');
//const { schema } = require('./Instructor');
const Schema = mongoose.Schema;
const ratinginstructorSchema = new Schema({
  
  instructorid:{
    
     type: mongoose.Schema.Types.ObjectId,
    ref:'User',
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

const rate_I= mongoose.model('Course',ratinginstructorSchema);

module.exports = rate_I;