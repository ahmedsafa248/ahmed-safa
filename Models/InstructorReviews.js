const mongoose = require('mongoose');

const { schema } = require('./User');

const Schema = mongoose.Schema;
const InstructorReviewsSchema = new Schema({
  
  instructorid:{
    
     type: mongoose.Schema.Types.ObjectId,
    ref:'User',
  },



  review: {
    type: String,
    required:true,
    
  }
}
, { timestamps: true });

const rev_I= mongoose.model('instreview',InstructorReviewsSchema);

module.exports = rev_I;