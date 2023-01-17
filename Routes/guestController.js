const express = require("express");
const router= express.Router()
const courses = require('../Models/Courses');
const { application } = require("express");
const user = require('../Models/User');

router.put("/selectCountryGue", async(req, res) =>{
    const user1= await user.find({_id:req.body.instructorId})
    if(!user1){
        res.status(400)
        throw new Error('please enter a valid email')
    }
    const userUpdate=await user.findOneAndUpdate({_id:req.body.instructorId},{Country:req.body.country})
    res.status(200).send(userUpdate);
});

router.get("/searchCourseGue", async(req, res) => {
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
   
router.get("/coursesByTitleG",async(req, res)=>{
    const cor= await courses.find({}, 'Title Course_Total_Hours Rating');//.where(Title=req.body.title);
        res.status(200).json(cor);
});
router.get("/coursesPriceG",async(req, res)=>{
    const cor= await courses.find({}, 'Title Price');
        res.status(200).json(cor);
});
router.get("/filterTitleGu", async(req,res)=>{

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

router.get("/filterPriceGu", async(req,res)=>{
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

router.get("/viewMostPopGuest", async(req,res)=>{
    const sort = { Rating: 1 };
    const cor= await courses.find().sort(sort);
    res.status(200).json(cor);
});

module.exports= router;