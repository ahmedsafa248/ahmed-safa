const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const Credit = require('./Credit');

const creditSchema = new Schema({
  Cardholder:{
    type: String,
    required: true
  },

 CardNumber:{
  type: String,
  required:true
 },

 CVV:{
    type:Number,
    required:true
 },
 ExpiryDate:{
  type:String,
  required:true
 }
}
, { timestamps: true });

const Credit = mongoose.model('Credit', creditSchema );

const userSchema = new Schema({

  Name: {
    type: String,
    },

  /*id: {
    type: Number,
   // unique:true,
    identity: true
     },*/

  Country: {
    type: String,
    },

    Terms:{
      type:Boolean,
     // required:true
    },

  Contract: {
    type:  Boolean,
    },

    Email: {
      type: String,
      },
    MiniBio: {
      type: String,
    },

  Password: {
    type: String,
    required:true,
    
  },
  role: {
    type: Number,
    required:true,
  },
  Username: {
    type: String,
    required:true,
    
  },
  Reviews:{
    type: Array
  },

  rating: {
    type: Number,
    required:false,
    
  },

  gender:{
    type: String
  },
  Credit:{
    type: creditSchema,
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;