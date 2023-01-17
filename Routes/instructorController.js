const express = require("express");
const router= express.Router();
const courses = require('../Models/Courses');
const Course = require('../Models/Courses');
const user = require('../Models/User');
const hefny = require('../Models/review');
const InstRev = require('../Models/InstructorReviews');
const exercises= require('../Models/Exercises')
const questions= require('../Models/Questions')
const subtitles= require('../Models/Subtitle')
//const dotenv = require("dotenv").config();
//const cors = require("cors");
//const bodyParser = require("body-parser");
const sendEmail = require("../Models/sendEmail")
const asyncHandler= require('express-async-handler');
const {protectIns}= require('../MiddleWare/Authentication')



router.put("/selectCountryIns", async(req, res) =>{
    const user1= await user.find({_id:req.body.instructorId})
    if(!user1){
        res.status(400)
        throw new Error('please enter a valid email')
    }
    const userUpdate=await user.findOneAndUpdate({_id:req.body.instructorId},{Country:req.body.country})
    res.status(200).send(userUpdate);
});

router.get("/filterTitleIns", async(req,res)=>{

    const type = req.body.type;
    const data1 = await courses.find({ Rating: req.body.rating, Subject: req.body.subject })
    const data2 = await courses.find({ Subject: req.body.subject })
    const data3 = await courses.find({ Rating: req.body.rating})
 if (type === "Subject"){
    if(!data2){
        res.status(400)
        console.log("no courses found")
        return;
     }
     res.status(200).json(data2);
     return;
 }
 if(type === "Rating"){
    if(!data3){
        res.status(400)
        console.log("no courses found")
        return;
     }
     res.status(200).json(data3);
     return;
 }   
 
 if(!data1){
    res.status(400)
    console.log("no courses found")
    return;
 }
 res.status(200).json(data1);
 
   });


   router.delete("/deleteCourse", async(req,res)=>{
    const del= await courses.deleteOne({_id:req.body.id});
    res.status(200).json(del);
});

   router.get("/filterPriceIns", async(req,res)=>{
    const data = await courses.find({})
    const a=[]
    if(!data){
       res.status(400).json("no courses found")
       console.log("no courses found")
       return;
    }
    else{
        data.forEach(element=>{
            if(req.body.Free=="true"){
                if(element.Price==0){
                    a.push(element)
                }
            }
           else if(element.Price <= req.body.maxPrice){
            a.push(element)
           }
          
        })
    }
    res.status(200).json(a);
   });

router.get("/getCourses",async(req, res)=>{
    const course=  await courses.find({});
    res.status(200).json(course);
});

router.get("/getE",async(req, res)=>{
    const course=  await exercises.find({});
    res.status(200).json(course);
});


router.get("/coursesByTitleIns",async(req, res)=>{
    const cor= await courses.find({}, 'Title Course_Total_Hours Rating');
    res.status(200).json(cor);
});

router.get("/coursesPriceIns",async(req, res)=>{
    const cor= await courses.find({}, 'Title Price');
        res.status(200).json(cor);
});

router.post("/SearchOwnCourseIns", asyncHandler( async(req, res)=>{
    
const cor= await courses.find({instructorid: req.body.instructorid});
const cor1= await courses.find({instructorid: req.body.instructorid, Title: req.body.title}); 
const cor2= await courses.find({instructorid: req.body.instructorid, Subject: req.body.subject});

    if(req.body.type === "title"){
   
       res.json(cor1);
       return;
   }
   else {
    if(req.body.type=== "subject"){
      
        res.json(cor2);
        return;
    }
        else{
            res.json(cor);
            return;
        }
    }
   
        
}));

router.get("/searchCourseIns", async(req, res) => {
    const cor= await courses.find({Title: req.body.title});
    const cor1= await courses.find({Instructor_Name: req.body.instructor});
    const cor2= await courses.find({Subject: req.body.subject});
    if(req.body.type === "title") {
        res.json(cor);
        return;
    }
    else { if(req.body.type === "instructor"){
        res.json(cor1);
        return;
    }
    else {
        if(req.body.type === "subject"){
            res.json(cor2);
            return;
        }
        else{
            res.json("No results");
            return;
        }
    }
}});


router.post("/add_course", async(req, res) => {
    const u= await user.findOne({_id: req.body.instructorid}, "Name");

    const cor= await courses.create({
      Title: req.body.title,
      Subtitles: req.body.subtitles,
      Subtitles_Total_Hours: req.body.sth,
      Exercises: req.body.exercises,
      YoutubeVideo:req.body.YoutubeVideo,
      Subject: req.body.subject,
      Price: req.body.price,
      Summary: req.body.summary,
      Course_Total_Hours: req.body.cth,
      Rating: req.body.rating,
      Instructor_Name: u['Name'],
      instructorid: req.body.instructorid,
    
    })
    res.send(cor);
  });

  router.put("/add_subtitle",async(req, res) => {
    const course= await courses.findOne({_id: req.body.Courseid});

    if(!course){
        res.json("that's not happening sorry")
    }
    else{
    const subtitle= await subtitles.create({
      Title: req.body.title,
      YoutubeVideo:req.body.YoutubeVideo,
      YoutubeDescription: req.body.YoutubeDescription,
      instructorid: req.body.instructorid,
      Courseid: req.body.Courseid,
    
    })

    const sub= course.Subtitles
    sub.push(subtitle)

    const cor = await courses.findOneAndUpdate({_id:req.body.Courseid},{Subtitles:sub})
    res.send(cor);
}
   
  });
   

  router.put("/update",async(req,res)=>{
    const user1= await user.find({}).where(_id= req.body.instructorid)

    if(!user1){
        res.status(400)
        throw new Error('please enter a valies email')
    }

const userUpdate= await user.findOneAndUpdate({_id: req.body.instructorid},{Name:"Ahmed"})
    res.status(200).send(userUpdate);
}); 

//the previous statement is for a later sprint


  router.get("/SearchMyCourses",async(req,res)=>{
    
    //Use instructorid as 636301450b56a822d9dcb4bc for example, returns results.
    //Then use instructorid as 123456789012345678901234, returns empty error.
    

    const results = await Course.find({instructorid: req.body.instructorid},{Title:1,_id:0});


    if (results.length!==0){
        res.json(results)
    }
    else {
        res.status(400).send('Sorry, you currently have no courses')
    }
});

router.get("/FilterMyCoursesPrice",async(req,res)=>{
    
    //Use instructorid as 636301450b56a822d9dcb4bc and price as 11 for example, returns results.
    //Then use instructorid as 636301450b56a822d9dcb4bc and price as 12, returns error.
    
    const results = await Course.find({instructorid: req.body.instructorid, Price: req.body.price});

    if (results.length!==0){
        res.json(results)
    }
    else {
        res.status(400).send('No courses found with specified filters.')
    }
});

router.get("/FilterMyCoursesSubject",async(req,res)=>{
    
    //Use instructorid as 636301450b56a822d9dcb4bc and subject as h for example, returns results.
    //Then use instructorid as 636301450b56a822d9dcb4bc and subject as j, returns error.
    
    const results = await Course.find({instructorid: req.body.instructorid, Subject: req.body.subject});

    if (results.length!==0){
        res.json(results)
    }
    else {
        res.status(400).send('No courses found with specified filters.')
    }
});

router.get("/ViewCourseDetails",async(req,res)=>{
    
    //Use _id as 63656e90a3452a6f57b91fbb for example, returns subject with name hamdy.
    //After implementation, this should never display an error because we get the _id from a result course.
    
    const results = await courses.find({_id: req.body._id});

        res.json(results)
});


//requirement 28:instructor views their rating and reviews- Mahmoud
router.get("/view_rating_reviews_inst",async(req,res)=>{
    
    //Use instructorid as 636301450b56a822d9dcb4bc and subject as h for example, returns results.
    //Then use instructorid as 636301450b56a822d9dcb4bc and subject as j, returns error.
    
    const results = await user.find({_id: req.body.instructorid},"rating Reviews");

    if (results.length!==0){
        res.json(results)
    }
    else {
        res.status(400).send('Nothing here lol')
    }
});

router.post("/add_review_inst", async(req, res) => {
    const user1= await InstRev.create({
      instructorid: req.body.instructorid,
      review: req.body.review,
      
    })

    //const cors= await hefny.find({Courseid: req.body.Courseid});
    //const reviewUpdate=await courses.findOneAndUpdate({_id:req.body.Courseid},{Reviews.push(cor)});

    const reviewUpdate1=await user.findOne({_id:req.body.instructorid});
    const r= reviewUpdate1.Reviews;
    r.push(user1);
    const reviewUpdate=await user.findOneAndUpdate({_id:req.body.instructorid},{Reviews:r});

    res.send(user1);
  });

//requirement 29: edit bio or email -Nihal
router.route('/editEmailOrBio/:id').post((req,res)=>{
    User.findById(req.params.id)
    .then(user => {
        user.Email = req.body.Email;
        user.MiniBio = req.body.MiniBio;

        user.save()
        .then(() => res.json('Instructor email/bio updated'))
        .catch(err => res.status(400).json('Error:' + err));
    })
    .catch(err => res.status(400).json('Error:' + err));

});

 //requirement 30: define promotion and for how long -Nihal
 router.route('/definePromotion/:id').post((req,res)=>{
    courses.findById(req.params.id)
    .then(courses => {
        courses.Promotion = req.body.promotion;
       //courses.Price === Price *(1-Promotion);
        courses.PromotionTime = req.body.promotiontime;

        courses.save()
        .then(() => res.json('Promotion uploaded'))
        .catch(err => res.status(400).json('Error:' + err));
    })

    .catch(err => res.status(400).json('Error:' + err));

});

//requirement 31: change password -Nihal
router.route('/ChangePasswordIns/:id').post((req,res)=>{
    User.findById(req.params.id)
    .then(user => {
        user.Password = req.body.Password;

        user.save()
        .then(() => res.json('Instructor password changed'))
        .catch(err => res.status(400).json('Error:' + err));
    })
    .catch(err => res.status(400).json('Error:' + err));

});



router.post("/sendemail", async (req, res) => {
    const email  = req.body.email;
  
    try {
      const send_to = email;
      const sent_from = "mohamedsafa1234@gmail.com";
      const reply_to = email
      const subject = "Confirmation Message From ELearning";
      const message = `
          <h3>Dear Client </h3>
          <p>You can now change password through the link:</p>
          <p>Regards, ELearning</p>
      `;
  
      await sendEmail(subject, message, send_to, sent_from, reply_to);
      res.status(200).json({ success: true, message: "Email Sent" });
    } catch (error) {
      res.status(500).json(error.message);
    }
  });

  
  router.post("/add_review", async(req, res) => {
    const cor= await hefny.create({
      Courseid: req.body.Courseid,
      review: req.body.review,
      
    })

    //const cors= await hefny.find({Courseid: req.body.Courseid});
    //const reviewUpdate=await courses.findOneAndUpdate({_id:req.body.Courseid},{Reviews.push(cor)});

    const reviewUpdate1=await courses.findOne({_id:req.body.Courseid});
    const r= reviewUpdate1.Reviews;
    r.push(cor);
    const reviewUpdate=await courses.findOneAndUpdate({_id:req.body.Courseid},{Reviews:r});

    res.send(cor);
  });

  router.get("/view_rating",async(req,res)=>{
    
    //Use instructorid as 636301450b56a822d9dcb4bc and subject as h for example, returns results.
    //Then use instructorid as 636301450b56a822d9dcb4bc and subject as j, returns error.
    
    const results = await Course.find({instructorid: req.body.instructorid},"Rating Reviews");

    if (results.length!==0){
        res.json(results)
    }
    else {
        res.status(400).send('No courses found with specified filters.')
    }
});

router.post("/MakeExercise", async(req,res)=>{
   
    const exe= await exercises.create({
        Title: req.body.title,
        Courseid: req.body.Courseid,
        instructorid: req.body.instructorid,
      })

      const addE= await courses.findOne({_id:req.body.Courseid});
      const E= addE.Exercises;
      E.push(exe);
      const UpdateE= await courses.findOneAndUpdate({_id:req.body.Courseid},{Exercises:E})

res.send(exe);
});
router.post("/MakeQuestions", async(req,res)=>{
    const exe= await questions.create({
        Question: req.body.question,
        OptionA: req.body.a,
        OptionB: req.body.b,
        OptionC: req.body.c,
        OptionD: req.body.d,
        Answer: req.body.answer,
        Courseid: req.body.Courseid,
        Exerciseid: req.body.exerciseid,
      })

      const addQ= await exercises.findOne({_id:req.body.exerciseid});
      const Q= addQ.Questions;
      Q.push(exe);
      const UpdateE= await exercises.findOneAndUpdate({_id:req.body.exerciseid},{Questions:Q})

      const updateC= await courses.findOne({_id:req.body.Courseid});

    const p= updateC.Exercises;
    p.forEach(element=>{
        if (element._id==req.body.exerciseid)
        element.Questions=Q
        
    })

    const C= await courses.findOneAndUpdate({_id:req.body.Courseid},{Exercises:p})
      
      res.send(exe);
});


router.put("/updateLinkforCourse", async(req,res)=>{
    const course1= await courses.find({instructorid:req.body.instructorId, _id: req.body.Courseid})
    if(!course1){
        res.status(400)
        throw new Error('course not found or you have no access to this course')
    }
    const courseUpdate=await courses.findOneAndUpdate({_id:req.body.Courseid},{YoutubeVideo:req.body.video})
    res.status(200).send(courseUpdate);
});

router.put("/updateLinkforSubtitle", async(req,res)=>{
    const sub1= await subtitles.find({instructorid:req.body.instructorId, Courseid: req.body.Courseid, _id: req.body.Subtitleid})
    if(!sub1){
        res.status(400)
        throw new Error('course not found or you have no access to this course')
    }
    else if(req.body.video=="" && req.body.vdes==""){
        res.status(200).send("nothing was changed, if you wish to delete a subtitle, click the delete option")
    }
    else if(req.body.video==""){
        const SubtitleUpdate=await subtitles.findOneAndUpdate({_id:req.body.Subtitleid},{YoutubeDescription: req.body.vdes })
    res.status(200).send(SubtitleUpdate);
    }
    else if(req.body.vdes==""){
        const SubtitleUpdate=await subtitles.findOneAndUpdate({_id:req.body.Subtitleid},{YoutubeVideo:req.body.video })
    res.status(200).send(SubtitleUpdate);
    }
    else{
    const SubtitleUpdate=await subtitles.findOneAndUpdate({_id:req.body.Subtitleid},{YoutubeVideo:req.body.video,YoutubeDescription: req.body.vdes })
    res.status(200).send(SubtitleUpdate);
    }
});
   
//GET CONTRACT, half of 5
router.get("/getContract",async(req,res)=>{
    
    //use 636301450b56a822d9dcb4bc as this is the only one with exercises and videos for now

    const videosLIST = await subtitles.find({instructorid: req.body.id},{Title:1,_id:0});
    const exercisesLIST = await exercises.find({instructorid: req.body.id},{Title:1,_id:0});
  
        res.json("By accepting this contract, you agree to use the following videos for educational purposes only, and that 5% per each video per student is to be taken by the website" + videosLIST +" and exercises:" + exercisesLIST)
    
    
});

//ACCEPT CONTRACT, half of 5
router.put("/acceptContract", async(req, res) =>{

    //create new instructor, Contract is set to false by default.

    const userr= await user.find({_id:req.body.id})
    if(!userr){
        res.status(400)
        throw new Error('instructor not found')
    }
    const userUpdate=await user.findOneAndUpdate({_id:req.body.id},{Contract:true})
    res.status(200).send(userUpdate);
});

    
router.get("/viewMostPopIns", async(req,res)=>{
    const sort = { Rating: 1 };
    const cor= await courses.find().sort(sort);
    res.status(200).json(cor);
});


module.exports= router;

