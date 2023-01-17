const mongoose = require('mongoose');
const { schema } = require('./Courses');
const { schema1 } = require('./User');
const Schema = mongoose.Schema;
const SubtitleSchema = new Schema({
  Title:{
    type: String,
    required: true
  },
  YoutubeVideo:{
    type: String,
    required:false
  },
  YoutubeDescription:{
    type: String,
    required: false
  },
  Courseid:{
    
     type: mongoose.Schema.Types.ObjectId,
    ref:'Course',
  },
  instructorid:{
    
    type: mongoose.Schema.Types.ObjectId,
   ref:'User',
 }
}
, { timestamps: true });

const Subtitle = mongoose.model('Subtitle',SubtitleSchema );

module.exports = Subtitle;
