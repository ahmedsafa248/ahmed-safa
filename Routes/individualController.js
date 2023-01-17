const { application } = require("express");
const express = require("express");
const router= express.Router()
const courses = require('../Models/Courses');
const user = require('../Models/User');
const ratecourse = require('../Models/ratecourse');
const exercises= require('../Models/Exercises')
const subtitles= require('../Models/Subtitle');
const questions= require('../Models/Questions')
const userquestionanswer= require('../Models/UserQuestionAnswer')
const useranswers= require('../Models/userAnswers')
const userviewquestionans= require('../Models/userviewquestionans')
const usersubmit = require('../Models/usersubmit')
const wallet = require('../Models/wallet')
const enrolled = require('../Models/enrolled')
const Transaction = require('../Models/Transaction')
const problems = require('../Models/problems')

router.post('/pay/payWithCard', async (req, res) => {
    try {
        const userId = req.body.traineeId;
        const amount = await courses.findById({_id:req.body.courseId});

        // Retrieve the user's credit card information
        const User = await user.findById({_id:userId});
        if (!User.Credit) {
            res.status(404).json({ error: 'User has no saved credit card' });
            return;
        }
        else{
        //     const newTransaction = new Transaction({
        //         userId: userId,
        //         amount: amount.Price,
        //         status: 'success',
        //         method: 'credit_card'
        // });

        const transaction={
            traineeid: userId,
            instructorid:amount.instructorid,
            courseid:amount._id,
                    amount: amount.Price,
                    status: 'success',
                    method: 'credit_card'
        }
        const addTransaction= await Transaction.create(transaction);
        res.json({ message: 'Payment success' });
        }
    } 
    catch (error) {
    res.status(500).json({ error: error.message });
    }
});

router.post('/getById',async(req,res)=>{
console.log(req.body.Courseid)
const cor= await courses.findOne({_id:req.body.Courseid});
console.log(cor)
res.send(cor);
});   

router.post('/pay/payWithWallet', async (req, res) => {
    try {
        const traineeId = req.body.traineeId;
        const courseId = req.body.courseId;
        const amount = await courses.Price;

        // Find the wallet of the trainee
        const Wallet = await wallet.findOne({ userId: traineeId });
        if (!Wallet) {
            res.status(404).json({ error: 'Wallet not found' });
            return;
        }
        // check if the wallet balance is enough
        if (Wallet.balance < amount) {
            res.status(400).json({ error: 'Insufficient balance' });
            return;
        }
        // Check if the course exists
        const course = await courses.findById(courseId);
        if (!course) {
            res.status(404).json({ error: 'Course not found' });
            return;
        }
        // Create a new transaction
        const newTransaction = new Transaction({
            traineeId: traineeId,
            courseId: courseId,
            amount: amount,
            status: 'success',
            method: 'wallet'
        });
        await newTransaction.save();
        // update the wallet balance
        Wallet.balance -= amount;
        Wallet.transactions.push(newTransaction._id);
        await Wallet.save();
        res.json({ message: 'Payment success' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.put("/selectCountryInd", async(req, res) =>{
    const user1= await user.find({_id:req.body.instructorId})
    if(!user1){
        res.status(400)
        throw new Error('please enter a valid email')
    }
    const userUpdate=await user.findOneAndUpdate({_id:req.body.instructorId},{Country:req.body.country})
    res.status(200).send(userUpdate);
});

router.get("/searchCourseInd", async(req, res) => {
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

router.get("/coursesByTitleInd",async(req, res)=>{
    const cor= await courses.find({}, 'Title Course_Total_Hours Rating');
        res.status(200).json(cor);
});

router.get("/coursesPriceInd",async(req, res)=>{
    const cor= await courses.find({}, 'Title Price');
        res.status(200).json(cor);
});

router.get("/filterTitleIndi", async(req,res)=>{

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





   router.get("/filterPriceIndi", async(req,res)=>{
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
  
   router.get("/ViewCourseDetails",async(req,res)=>{
    
    //Use _id as 63656e90a3452a6f57b91fbb for example, returns subject with name hamdy.
    //After implementation, this should never display an error because we get the _id from a result course.
    
    const results = await courses.find({_id: req.body._id});

        res.json(results)
});

router.get("/ViewEInd", async(req,res)=>{
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

router.post("/RateCourseInd", async(req, res) => {
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


  router.post("/RateInstructorInd", async(req, res) => {
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
router.route('/ChangePasswordInd/:id').post((req,res)=>{
    user.findById(req.params.id)
    .then(user => {
        user.Password = req.body.Password;

        user.save()
        .then(() => res.json('Individual Trainee password changed'))
        .catch(err => res.status(400).json('Error:' + err));
    })
    .catch(err => res.status(400).json('Error:' + err));

})

router.post("/enrolledin",async(req,res)=>{
    
    const results = await enrolled.find({traineeid:req.body.traineeid});
    //const results = await enrolled.find({traineeid: "63b3c66fe82d3c76bcf209b1"});
   // const array= results.EnrolledStudents;
    console.log(req.body.traineeid);
   // console.log(results)
    res.status(200).send(results)

    // if (results.length!==0){
    //     res.status(200).send(results)
    
    // else {
    //     res.send('not enrolled')
    // }
});

router.post("/add_enrolled", async(req, res) => {
    const sii= await enrolled.create({
      Courseid: req.body.Courseid,
      traineeid: req.body.traineeid,
      Cname: req.body.Cname,
      
    })

    res.send(sii);
  });

  router.post("/report_problem", async(req, res) => {
    const siii= await problems.create({
      Courseid: req.body.Courseid,
      traineeid: req.body.traineeid,
      problems: req.body.problems,
      type: req.body.type,
      
      
    })

    res.send(siii);
  });


router.get("/getUA",async(req, res)=>{
    const course=  await useranswers.find({});
    res.status(200).json(course);
});

router.get("/getUVAQ",async(req, res)=>{
    const course=  await userviewquestionans.find({});
    res.status(200).json(course);
});

router.get("/getQ",async(req, res)=>{
    const course=  await questions.find({_id:req.body.id});
    res.status(200).json(course);
});

router.delete("/deleteUVAQ", async(req,res)=>{
    const del= await userviewquestionans.deleteOne({_id:req.body.id});
    res.status(200).json(del);
});


      router.post("/chooseans",async(req, res)=> {
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
  
  
  
  router.get("/grade", async(req,res)=>{
         
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

  router.get("/viewans", async(req,res)=>{
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


router.get("/submit", async (req,res)=>{
    const q= await useranswers.findOne({Userid:req.body.userid,Exerciseid:req.body.exerciseid});
       const qArray= q.Questions;
    const sub = await usersubmit.create({Userid:req.body.userid,Exerciseid:req.body.exerciseid,Questions:qArray});
    res.status(200).json(sub);

});

//17, exists in both individual and corporate with Subtitle and subtitles being the only difference
router.get("/getCourseContent",async(req,res)=>{
    
    //use 63656e90a3452a6f57b91fbb 

    const videosLIST = await subtitles.find({Courseid: req.body.courseid});
    const exercisesLIST = await exercises.find({Courseid: req.body.courseid});
  
        res.json(videosLIST + exercisesLIST)});

//39, takes id of a video and returns the link., in both coporate and indiviual same as above.
router.get("/watchVideo",async(req,res)=>{
    
    //use 6392767efbc07b7e5b46d8c5
  
        res.json(await subtitles.find({_id: req.body.id},{YoutubeVideo:1,_id:0}))});


//13, Preview course video and outline -fuck this shit
router.get("/previewCourse", async(req, res)=>{

    const results = await courses.find({_id: req.body._id}, 'YoutubeVideo Summary');

    res.send(results)

});

router.get("/viewMostPopInd", async(req,res)=>{
    const sort = { Rating: 1 };
    const cor= await courses.find().sort(sort);
    res.status(200).json(cor);
});

router.put("/add_Credit", async(req,res)=>{
    const credit={
        Cardholder: req.body.ch,
        CardNumber: req.body.cn,
        CVV: req.body.cvv,
        ExpiryDate: req.body.ed
    }

    const updateUser= await user.findOneAndUpdate({_id:req.body._id},{Credit:credit})
    res.status(200).json(updateUser);
});


  module.exports= router;

  
