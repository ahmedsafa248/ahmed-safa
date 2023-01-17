const mongoose = require('mongoose');
const { schema } = require('./User');
const { schema3 } = require('./review');

//const { schema } = require('./Instructor');
const Schema = mongoose.Schema;
const CoursesSchema = new Schema({
  Title:{
    type: String,
    required: true
  },
  YoutubeVideo:{
    type: String,
    required:false
  },
  Subtitles:{
    type: Array,
    required: false
  },
  Subtitles_Total_Hours:{
    type: Number,
    required: false
  },
  Subject:{
    type: String,
    required: true
  },
   Exercises:{
    type: Array,
    required: false
  },
  Course_Total_Hours:{
    type: Number,
    required: false
  },
  Price: {
    type: String,
    required: true
  }, 
  Rating:{
    type: Number,
    required: false
  },
  Instructor_Name:{
    type: String
  },
  Summary:{
    type: String
  },

  Promotion: {
    type: Number,
  },
  PromotionTime: {
    type: Number,
  },
  Reviews:{
    type: Array
  },
  instructorid:{
    
     type: mongoose.Schema.Types.ObjectId,
    ref:'User',
  },
  Popularity:{
    type:Number,
  }

 
}
, { timestamps: true });

const Course = mongoose.model('Course',CoursesSchema );

module.exports = Course;
