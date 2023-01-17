const mongoose = require('mongoose');
const { schema } = require('./Courses');
const User = require('./User');

const transactionSchema = new mongoose.Schema({
    instructorid:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
     },
    traineeid:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    courseid:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Courses',
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    status:{
        type: String,
        required: true
    }


});
const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;