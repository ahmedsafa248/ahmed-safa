const mongoose = require('mongoose');
const User = require('./User');
const Question= require('./Questions')

const Schema = mongoose.Schema;
const UserQuestionsAnswerSchema = new Schema({
  Answer:{
    type: String,
    required: true
  },
  
 
  Questionid:{
    
    type: mongoose.Schema.Types.ObjectId,
   ref:'Questions',
 },
 ans:{
    type: Boolean,
    required:true 
 },
 Userid:{
    
    type: mongoose.Schema.Types.ObjectId,
   ref:'User',
 }
  

}
, { timestamps: true });

const UserQuestionsAnswer = mongoose.model('UserQuestonsAnswer',UserQuestionsAnswerSchema );

module.exports = UserQuestionsAnswer;
