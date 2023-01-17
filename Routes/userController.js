const express = require("express");
const router= express.Router();
const user = require('../Models/User');
const jwt= require('jsonwebtoken');
const bcrypt= require('bcryptjs');
const asyncHandler= require('express-async-handler');
const {protect}= require('../MiddleWare/Authentication')

// 1=admin,2=instructor,3=guest,4=individual trainee,5=coorprate trainee

router.get("/Terms",asyncHandler(async(req, res) => {
    const header= 'Here by reading the terms and conditions you must accept and acknowledge the following to be able to continue:'
    const WebRegulations='by accepting the TermS and Conditions you hereby must abide to the company policies, which are not using violent language online, not using your privilage from personal monetary gain or piracy, not branding or advertising the company unless given permission'
    const RefundPolicy='upon requesting a refund, you may have to wait for a specific period until an admin responds to your request, keep in mind if the admin sees the request as not reasonable it will be rejected, and any false claims made during requests could result in a temporary or permanent ban. Once money is refunded you will find it as credits in your wallet which you may use to register for other courses'
    const PaymentPolicy='payment is done through credit/debit accounts, payments may take a while to register so do be patient please'   
    const footer= 'Enjoy Surfing and Learning - Admin Team'
    const a={header,WebRegulations,RefundPolicy,PaymentPolicy,footer}
res.send(a);
  }) );

router.post("/Login",asyncHandler( async(req, res) => {
   const logUser= {
    Username: req.body.Username,
    Password: req.body.Password
   }
   
   const users= await user.findOne({Username:req.body.Username})

   if(users && (await bcrypt.compare(req.body.Password,users.Password))){
    const tokenout={
        token:generateToken(users._id)
    }
   
   res.status(201).json({tokenout:tokenout, user:users});
   // res.json(users);
   }
   else{
    res.status(400)
    throw new Error('Invalid Username or Password')
   }
    // res.json( 'user Log');
  }));

router.post("/Register", asyncHandler(async(req, res) => {
    const newIndividualTrainee={
        Name: req.body.FirstName +" "+ req.body.LastName,
        Username:req.body.Username,
        Email:req.body.Email,
        Password:req.body.Password,
        gender: req.body.gender,
        role:4,
        Terms:req.body.Terms
    };

    if(!req.body.FirstName||!req.body.LastName||!req.body.Username||!req.body.Email||!req.body.Password||!req.body.gender){
        res.status(400);
        throw new Error('Please Fill in All Fields');
    }

    if(req.body.Terms==false){
        res.status(400)
        throw new Error('Please Accept the Terms and Conditions')
    }

    const findUsername= await user.findOne({Username: req.body.Username});
    const findEmail= await user.findOne({Email:req.body.Email});   
    if(findUsername!=null){
      res.status(400).send('Username is already taken, please choose another')
    }
    if(findEmail!=null){
        res.status(400).send('This email is already registered for an account')
      }
    else{
        const Salt= await bcrypt.genSalt(10);
        const hashedPass= await bcrypt.hash(req.body.Password,Salt);

    const cor= await user.create({
      Username: newIndividualTrainee.Username,
      Password: hashedPass,
      role: 4,
      Country: null,
      Name: newIndividualTrainee.Name,
      Terms: newIndividualTrainee.Terms,
     Email: newIndividualTrainee.Email,
     gender: newIndividualTrainee.gender,
     MiniBio:null,
     Reviews:null,
     rating:null
    })

    const tokenout={
        token:generateToken(cor._id)
    }
   // res.status(201).send(cor);
   res.status(201).json({tokenout:tokenout,user:cor});

  }
    
    //res.json( 'user reg');
    }));

    const generateToken=(_id)=>{
        return jwt.sign({_id},""+process.env.JWT_SECRET,{ expiresIn:'30d'})
    }
 
    router.get('/spec',protect, asyncHandler(async(req,res)=>{
       //const users= await user.findOne({Username: req.body.Username})
        const users= await user.findById(req.user._id)
        res.send(users);
    }))


module.exports= router;