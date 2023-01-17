const mongoose = require('mongoose');
const { schema } = require('./Courses');
const User = require('./User');
const Transaction = require('./Transaction');
//47291904833822386950
const walletSchema = new mongoose.Schema({
    Userid:{
       type: mongoose.Schema.Types.ObjectId,
       ref:'User',
       required: true
     },
    balance:{
        type: Number,
        default: 0
    },
    refunds: [{
        transactionID: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Transaction',
            required:true
        },
        amount: {
            type: Number,
            required: true
        }
    }]

});

const wallet = mongoose.model('wallet',walletSchema);
module.exports = wallet;