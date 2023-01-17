
const { application } = require("express");
const express = require("express");
const router= express.Router()
const user = require('../Models/User');
const courses = require('../Models/Courses');
const exercises= require('../Models/Exercises');
const Subtitle = require("../Models/Subtitle");
const questions= require('../Models/Questions')
const userquestionanswer= require('../Models/UserQuestionAnswer')
const useranswers= require('../Models/userAnswers')
const userviewquestionans= require('../Models/userviewquestionans')
const usersubmit = require('../Models/usersubmit')
const access = require('../Models/access')
const enrolled= require('../Models/enrolled')
router.put("/selectCountryCor", async(req, res) =>{
   const user1= await user.find({_id:req.body.instructorId})
   if(!user1){
       res.status(400)
       throw new Error('please enter a valid email')
      }
      const userUpdate=await user.findOneAndUpdate({_id:req.body.instructorId},{Country:req.body.country})
      res.status(200).send(userUpdate);
  });

router.get("/filterTitleCor", async(req,res)=>{

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

router.get("/coursesByTitleCor",async(req, res)=>{
    const cor= await courses.find({}, 'Title Course_Total_Hours Rating');//.where(Title=req.body.title);
        res.status(200).json(cor);
});

router.get("/searchCourseCor", async(req, res) => {
   const cor= await courses.find({Title: req.body.title});
   const cor1= await courses.find({Instructor_Name: req.body.instructor});
   const cor2= await courses.find({Subject: req.body.subject});

   if(req.body.type === "title") {
       res.json(cor);
       return;
   }
   else {
       if(req.body.type === "instructor"){
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

  router.get("/ViewECor", async(req,res)=>{
    const q= await exercises.findOne({_id:req.body.id})
    const a=[]
    q.Questions.forEach( async element=>{

        const b={
            Question:element.Question,
            OptionA:element.OptionA,
            OptionB:element.OptionB,
            OptionC:element.OptionC,
            OptionD:element.OptionD,
            Courseid:element.Courseid,
            Exerciseid:element.Exerciseid,
            _id:element._id
        }
        a.push(b)
        console.log(a)
      
    })
    res.send(a)
    
  });

  router.post("/RateCourseCor", async(req, res) => {
    const adm= await ratecourse.create({
      Courseid: req.body.Courseid,
      traineeid: req.body.traineeid,
      rating:req.body.rating,
      
    })

    const cor= await ratecourse.find({Courseid: req.body.Courseid});
    var sum= 0;
    var count=0;
    cor.forEach(element => {
        sum+=element.rating;
        count++;
         });
         const average=(sum/(count*5))*5;
         const userUpdate=await courses.findOneAndUpdate({_id:req.body.Courseid},{Rating:average});


    res.send(adm);
  });

  router.post("/RateInstructorCor", async(req, res) => {
    const adm= await rateinstructor.create({
      instructorid: req.body.instructor.id,
      traineeid: req.body.traineeid,
      rating:req.body.rating,
      
    })

    const cor= await rateinstructor.find({iourseid: req.body.instructorid});
    var sum= 0;
    var count=0;
    cor.forEach(element => {
        sum+=element.rating;
        count++;
         });
         const average=(sum/(count*5))*5;
         const userUpdate=await courses.findOneAndUpdate({_id:req.body.instructor.id},{Rating:average});


    res.send(adm);
  });

 //requirement 31: change password -Nihal
 router.route('/ChangePasswordCor/:id').post((req,res)=>{
  user.findById(req.params.id)
  .then(user => {
      user.Password = req.body.Password;

      user.save()
      .then(() => res.json('Corporate Trainee password changed'))
      .catch(err => res.status(400).json('Error:' + err));
  })
  .catch(err => res.status(400).json('Error:' + err));

});
router.post("/chooseansCor",async(req, res)=> {
    const a= req.body.a;
    const question= await questions.findOne({_id:req.body.questionid});
    const answer= await userquestionanswer.create({Userid:req.body.userid,Questionid:req.body.questionid, Answer:req.body.a, ans:false});
    if(a===question.Answer){
     // answer.Answer=a;
      answer.ans=true;

    }
    else{
    // answer.Answer=a;
      answer.ans=false;
    }

    const q= await useranswers.findOne({Userid:req.body.userid,Exerciseid:req.body.exerciseid});
    if(q===null){
     const p = await useranswers.create({Userid:req.body.userid,Exerciseid:req.body.exerciseid, Courseid:req.body.courseid});
    // q= await useranswers.findOne({Userid:req.body.userid,Exerciseid:req.body.exerciseid});
    }
    const vq= await useranswers.findOne({Userid:req.body.userid,Exerciseid:req.body.exerciseid});

    const pushQuestion= vq.Questions;
    pushQuestion.push(answer);
    const update= await useranswers.findOneAndUpdate({Userid:req.body.userid,Exerciseid:req.body.exerciseid},{Questions:pushQuestion})
    res.send(update)
   
    });



router.get("/gradeCor", async(req,res)=>{
     
   var grade =0;
   const q= await useranswers.findOne({Userid:req.body.userid,Exerciseid:req.body.exerciseid});
   const qArray= q.Questions
   qArray.forEach(element=>{
      if (element.ans)
      grade++
      })

      grade= (grade/qArray.length)*100

      res.status(200).json(grade + "%");
});


router.post("/request_access", async(req, res) => {
    //const data11= await access.find({ Courseid: req.body.Courseid,  coorprateid: req.body. coorprateid })
    const data22 = await enrolled.find({ Courseid: req.body.Courseid,  traineeid: req.body. traineeid })
    console.log(data22)
    if(data22.length>0){
      res.status(400).send('already enrolled')
  
    }

    else{
    const siiii= await access.create({
      Courseid: req.body.Courseid,
      traineeid: req.body.traineeid,
      Cname: req.body.Cname,  
      username:req.body.username,
    })

    res.send(siiii);
}
    
    
  });



router.get("/viewansCor", async(req,res)=>{
const result1= await userviewquestionans.findOne({Userid:req.body.userid, Exerciseid:req.body.exerciseid})
if(result1===null){
    const answers= await useranswers.findOne({Userid:req.body.userid, Exerciseid:req.body.exerciseid})
if(answers=== null){
    res.send("Sorry but you have not taken this exercise yet")
}
else{
    const result2= await userviewquestionans.create({Userid:req.body.userid, Exerciseid:req.body.exerciseid})
    const result= await userviewquestionans.findOne({Userid:req.body.userid, Exerciseid:req.body.exerciseid})

const qa= result.Questionsans
const id= result._id

answers.Questions.forEach(async element=>{
   
var part= await  questions.findOne({_id:element.Questionid})
    
const output= {
Question: part.Question,
OptionA:part.OptionA,
OptionB:part.OptionB,
OptionC:part.OptionC,
OptionD:part.OptionD,
Answer:part.Answer,
UserAnswer: element.Answer
}
qa.push(output)
const final= await userviewquestionans.findOneAndUpdate({Userid:req.body.userid, Exerciseid:req.body.exerciseid},{Questionsans:qa})

})

const done= await userviewquestionans.findOne({Userid:req.body.userid, Exerciseid:req.body.exerciseid})
res.status(200).json(done);
}
}
else{
    res.status(200).json(result1);
}

});
router.get("/submitcor", async (req,res)=>{
    const q= await useranswers.findOne({Userid:req.body.userid,Exerciseid:req.body.exerciseid});
       const qArray= q.Questions;
    const sub = await usersubmit.create({Userid:req.body.userid,Exerciseid:req.body.exerciseid,Questions:qArray});
    res.status(200).json(sub);

});

//17, exists in both individual and corporate with Subtitle and subtitles being the only difference
router.get("/getCourseContent",async(req,res)=>{
    
    //use 63656e90a3452a6f57b91fbb

    const videosLIST = await Subtitle.find({Courseid: req.body.courseid});
    const exercisesLIST = await exercises.find({Courseid: req.body.courseid});
  
        res.json(videosLIST + exercisesLIST)});

        //39, takes id of a video and returns the link., in both coporate and indiviual same as above.
router.get("/watchVideo",async(req,res)=>{
    
    //use 6392767efbc07b7e5b46d8c5
  
        res.json(await Subtitle.find({_id: req.body.id},{YoutubeVideo:1,_id:0}))});

router.get("/viewMostPopCor", async(req,res)=>{
            const sort = { Rating: 1 };
            const cor= await courses.find().sort(sort);
            res.status(200).json(cor);
});

module.exports= router;
