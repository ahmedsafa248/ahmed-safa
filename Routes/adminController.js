
const express = require("express");
const router= express.Router();
const user = require('../Models/User');
const access = require('../Models/access');
const enrolled = require('../Models/enrolled');
const bcrypt= require('bcryptjs');
const asyncHandler= require('express-async-handler');
const {protect}= require('../MiddleWare/Authentication')





router.get("/users", async(req, res) => {
    const all_users= await user.find()
    res.send( all_users);
  });
// 1=admin,2=instructor,3=guest,4=individual trainee,5=coorprate trainee

router.post("/add_admnistrator", asyncHandler( async(req, res) => {
  const findUsername= await user.findOne({Username: req.body.username});
   
  if(findUsername!=null){
    res.status(400).send('Username is already taken, please choose another')

  }
  else{
    const Salt= await bcrypt.genSalt(10);
    const hashedPass= await bcrypt.hash(req.body.password,Salt);

  const adm= await user.create({
      Username: req.body.username,
      Password:hashedPass,
      role: 1,
      Country: null,
      Name: null,
    })
    res.send(adm);
  }
  }));

  router.post("/add_instructor", asyncHandler(async(req, res) => {
    const findUsername= await user.findOne({Username: req.body.username});
   
    if(findUsername!=null){
      res.status(400).send('Username is already taken, please choose another')
  
    }
    else{
      const Salt= await bcrypt.genSalt(10);
      const hashedPass= await bcrypt.hash(req.body.password,Salt);

    const inst= await user.create({
      Username: req.body.username,
      Password: hashedPass,
      role: 2,
      Country: null,
      Name: null,
      rating: 0,
      Contract: 0,
    })

    res.send(inst);
  }
  
  }));

  router.post("/add_corporate",  asyncHandler(async(req, res) => {
    const findUsername= await user.findOne({Username: req.body.username});
   
    if(findUsername!=null){
      res.status(400).send('Username is already taken, please choose another')
  
    }
    else{
      const Salt= await bcrypt.genSalt(10);
      const hashedPass= await bcrypt.hash(req.body.password,Salt);

    const cor= await user.create({
      Username: req.body.username,
      Password: hashedPass,
      role: 5,
      Country: null,
      Name: null,
      //id: 0,
  
    })
    res.send(cor);
  }
  }));

  router.post("/view_requests", async(req, res) => {
    const results1 = await access.find({},"Cname username traineeid");
    console.log(results1);
      res.send( results1);
      
    });

    router.post("/giveaccess", async(req, res) => {
      const data222= await access.find({ Courseid: req.body.Courseid,  traineeid: req.body. traineeid })
      console.log(data222)
      if(data222.length>0){
      const siiiii= await enrolled.create({
        Courseid: req.body.Courseid,
        traineeid: req.body.traineeid,
        Cname: req.body.Cname,
        
      })
  
      res.send(siiiii);
    }
    });



  module.exports= router;