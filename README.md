
# Online learning system
Our website is simply a learning website to make life easier for both students and instructors. A user can now know all the information needed about all of his courses where he can address any problem he faced and report it, same goes for instructors that can view all the courses he will teach with all the details needed. This is just a brief about our website that has so many other feautures.




## motivation

I created an online learning application because I believe that education is a powerful tool for personal and professional growth. With the advent of technology, it is now easier than ever to access educational resources and opportunities from anywhere in the world. I wanted to create a platform that makes learning accessible to everyone, regardless of location or background, and allows individuals to take control of their own education and progress at their own pace. Furthermore, an online learning application offers flexibility and convenience, which are important factors for many learners, especially those with busy schedules. My goal is to empower individuals to achieve their full potential through lifelong learning.

## style


We have divided the frontend and backend of our application and merged them using the slice and service method. This approach allows us to separate the concerns of the application and make it more modular and maintainable. The slice method manages the state of the frontend and communicates with the backend through the service method. The service method, on the other hand, handles the business logic and the communication with the database. This separation of concerns makes it easier to test, debug and update the application, and also enables us to scale the application horizontally.
## build style

Our online learning website is still under construction and we are working hard to make it the best it can be for our users. We are constantly updating and improving the site to ensure that it is user-friendly and easy to navigate. We are also adding new features and resources to make the learning experience as engaging and effective as possible. We understand that our users have high expectations and we want to make sure that we meet and exceed those expectations. We are committed to making our online learning website a valuable resource for anyone looking to learn new skills and advance their education. Thank you for your patience and please stay tuned for updates and improvements in the near future.
## frame work

Our online learning application utilizes the MERN stack, which stands for MongoDB, Express.js, React, and Node.js. This stack allows us to build a full-featured web application with a powerful, flexible and scalable backend and a responsive, interactive and user-friendly frontend
## features

Our online learning website is designed to be very flexible and easy to use for both students and instructors. The platform is intuitive and user-friendly, making it simple for students to access their course materials and track their progress. Instructors have the ability to upload and organize their content, and can easily communicate with students through built-in messaging and discussion boards. The website also has a range of features and functionalities that allow both students and instructors to see all the information they need in one place. This includes grades, feedback, course schedules, and more. Overall, our goal is to provide an efficient and seamless learning experience for all users.
## installation

you first run the backend

- cd ACML-project
- cd src
- node App.js

the run the frontend

- cd ACML-project
- cd frontend
- npm start
## how to use

if you want to add a method or a feature to the website, you first create all the method in the backend, then link them using the slice and service techniques
## help us

We value the feedback of our users and believe that it is essential to the ongoing improvement of our online learning website. That's why we have implemented a system that allows users to rate and review their experience on our website. This feedback is crucial in identifying areas of improvement and ensuring that we are meeting the needs of our users. By giving their ratings and reviews about the website, users can help shape the direction of the platform and make a real impact on the learning experience for themselves and others. We encourage all users to share their thoughts and suggestions, as we are constantly looking for ways to improve the website and enhance the overall user experience. Your input is greatly appreciated and will be used to make our online learning website the best it can be.
## credits

those are the links of the videos that really helped me in developing this website

https://youtu.be/w3vs4a03y3I
https://youtu.be/fnpmR6Q5lEc
https://youtu.be/9KaMsGSxGno

## license

The MIT License is a permissive free software license that is popular for its short and simple terms. It is one of the most widely used open-source licenses.
Here is the link where you can find the MIT license:
https://opensource.org/licenses/MIT
Please note that this link is the official webpage of OpenSource.org, where you can find the full text of the MIT license.

You can also find it on Github website at : https://github.com/licenses/mit
## code examples

1-


import {useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { rateCourse,reset } from '../features/corporate/corporateSlice'
import Spinner from '../components/Spinner'

function RateCourse(){

    const {cid,isLoading, isError, isSuccess, message}= useSelector(
        (state)=>state.corporate)

    const{user}=useSelector((state)=>state.auth)

 
        const dispatch=useDispatch()
        const navigate=useNavigate()

  const [courses, setCourses]=useState({
    Courseid:cid._id,
    traineeid: user.user._id,
    rating:null,
    // subtitles:[]
})

const {Courseid,traineeid,rating}= courses

    const onChange=(e)=>{
        setCourses((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value,
            // [e.target.name]:type==="checkbox" ? checked:e.target.value
        }))
    }
    
    const onSubmit=(e)=>{
        e.preventDefault()
        const query={
            Courseid:cid._id,
            traineeid: user.user._id,
            rating:rating,
        };

       // console.log(query)

       dispatch(rateCourse(query))
       alert("rating saved")
        }
       
       
    

    if(isLoading){
        return<Spinner/>
    }
    
    
      return (
        <div className='form-group'>
            <h2 className='heading'>please enter rating from 1 to 5</h2>
            <form onSubmit={onSubmit}>
                <input className='form-control' name="rating" id="rating" placeholder="rating" value={rating} type="text" onChange={(onChange)}></input>
                <br />
                
               
                <button className='btn btn-block' onClick={(onSubmit)}>rate</button>
            </form>
        </div>
      );
}

export default RateCourse;



2- 

import {useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { sendEmail,reset } from '../features/authSlice'
import Spinner from '../components/Spinner'

function SendEmail(){

    const { isLoading, isError, isSuccess, message}= useSelector(
        (state)=>state.instructor)

    const{user}=useSelector((state)=>state.auth)

 
        const dispatch=useDispatch()
        const navigate=useNavigate()

  const [courses, setCourses]=useState({
    email:null,
    //Password: null,
    // subtitles:[]
})

const {email}= courses

    const onChange=(e)=>{
        setCourses((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value,
            // [e.target.name]:type==="checkbox" ? checked:e.target.value
        }))
    }
    
    const onSubmit=(e)=>{
        e.preventDefault()
        const query={
            email:email,
         

        };

       // console.log(query)

       dispatch(sendEmail(query))
       alert("mail sent")
    //    navigate()
        }
       
       
    

    if(isLoading){
        return<Spinner/>
    }
    
    
      return (
        <div className='form-group'>
            <h2 className='heading'>please enter your mail for verfication</h2>
            
            <form onSubmit={onSubmit}>
                <input className='form-control' name="email" id="email" placeholder="email" value={email} type="text" onChange={(onChange)}></input>
                <br />
               
               
                <button className='btn btn-block' onClick={(onSubmit)}>send</button>
            </form>
        </div>
      );
}

export default SendEmail;


3- 

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


4- 

router.post("/add_enrolled", async(req, res) => {
    const sii= await enrolled.create({
      Courseid: req.body.Courseid,
      traineeid: req.body.traineeid,
      Cname: req.body.Cname,
      
    })

    res.send(sii);
  });

  
## tests

http://localhost:8000/request_access


input:

{
    "Courseid": "6394c8d9464a2b0ac6ff1a48",
    "username": "ahmed",
    "traineeid": "63c494aec7c8e122b4ac7104",
    "Cname": "cs",
    
}


output:

{
    "Courseid": "6394c8d9464a2b0ac6ff1a48",
    "username": "ahmed",
    "traineeid": "63c494aec7c8e122b4ac7104",
    "Cname": "cs",
    "_id": "63c6e41e27c3e8954d54dc0a",
    "createdAt": "2023-01-17T18:08:30.920Z",
    "updatedAt": "2023-01-17T18:08:30.920Z",
    "__v": 0
}


http://localhost:8000/giveaccess

input:

{
    "Courseid": "6394c8d9464a2b0ac6ff1a48",
    "traineeid": "6362faf554be5962694bf08a",
    "Cname": "cs",
   
}


output:

{
    "Courseid": "6394c8d9464a2b0ac6ff1a48",
    "traineeid": "6362faf554be5962694bf08a",
    "Cname": "cs",
    "_id": "63c6d92940f9416a2756db44",
    "createdAt": "2023-01-17T17:21:45.374Z",
    "updatedAt": "2023-01-17T17:21:45.374Z",
    "__v": 0
}


http://localhost:8000/view_requests

input: nothing


output:

    },
    {
        "_id": "63b3571c911a8cd2d5ced5b8",
        "Cname": "cs"
    },
    {
        "_id": "63b358ceb3eaedaeb986fb88",
        "Cname": "cs"
    },
    {
        "_id": "63b3592ab3eaedaeb986fb8b",
        "Cname": "cs"
    },
    {
        "_id": "63b35938bb5d19a4df601c4f",
        "Cname": "cs"
    },
    {
        "_id": "63b3926126c688bbc881392a",
        "Cname": "cs"
    },
    {
        "_id": "63b3932d26c688bbc881392e",
        "Cname": "cs"
    },
    {
        "_id": "63b3958dbc912230384ebaa2",
        "Cname": "cs"
    },
    {
        "_id": "63b39a3f54042e4c148e0c9f",
        "Cname": "cs"
    },
    {
        "_id": "63b39ae0db0f2ab5886005ed",
        "traineeid": "6362faf554be5962694bf08a",
        "Cname": "cs"
    },
    {
        "_id": "63c6d6cde5397b90ec5646d5",
        "traineeid": "6362faf554be5962694bf08a"
    },
    {
        "_id": "63c6d7c1e5397b90ec5646d9",
        "traineeid": "6362faf554be5962694bf08a",
        "Cname": "cs"
    }
]


http://localhost:8000/report_problem

input:

{
    "Courseid": "63c1bad5994e2718ace1191c",
    "traineeid": "63c56e1839e9cec84887543d",
    "problems": "bad ta",
  

output: {
    "Courseid": "63c1bad5994e2718ace1191c",
    "traineeid": "63c56e1839e9cec84887543d",
    "problems": "bad ta",
    "_id": "63c5fbec8e8c56c921713c0f",
    "createdAt": "2023-01-17T01:37:48.271Z",
    "updatedAt": "2023-01-17T01:37:48.271Z",
    "__v": 0
}


## API Reference

#### add admin/add_instructor/add_corporate

```http
  http://localhost:8000/add_admnistrator
  http://localhost:8000/add_instructor
  http://localhost:8000/add_corporate

  same inputs and outputs for this 3 methods

```
input

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username | `string` | **Required**. username of the user
| `password | `string` | **Required**. password of the user |

output

nothing the user is now created


###
view course requets

  http://localhost:8000/view_requests
  
```
inputs 

outpit
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| courses   | `array` | **Required**. all course requets sent by user |

```
### 



give access to requested courses

http://localhost:8000/giveaccess

input

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| courseid   | `int` | **Required**. courseid of the requested course |
  traineeid    | `int` | **Required**. id of the user that requested the course|

output: nothing just gives access to the course
```
### 

rate instructor

http://localhost:8000/rateInstructorCor


inputs 

outpit
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| instructorid   | `int` | **Required** id of the instructor to be rated |
| traineeid   | `int` | **Required** id of student that gave a rating |
| rating  | `string` | **Required** rating to be added|

output: adds the rating

```
### 

rate course

http://localhost:8000/rateCourseCor


inputs 

outpit
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| courseid   | `int` | **Required** id of the course to be rated |
| traineeid   | `int` | **Required** id of student that gave a rating |
| rating  | `string` | **Required** rating to be added|

output: adds the rating

```
### 

request access

http://localhost:8000/request_access


inputs 

outpit
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| courseid   | `int` | **Required** id of the course that he wants|
| traineeid   | `int` | **Required** id of thenstudent  |


output: request sent

```
### 

show enrolled Courses 

http://localhost:8000//enrolledin


input 
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |

| traineeid   | `int` | **Required** id of the student |


output: the enrolled in courses

```
### 

add a student to a course 

http://localhost:8000//add_enrolled


input 
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| courseid   | `int` | **Required** id course to be enrooled in|
| traineeid  | `int` | **Required** id of student |

| Cname  | `int` | **Required** course name|


output: student is now enrolled

```
### 

report a problem

http://localhost:8000//report_problem


input 
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| courseid   | `int` | **Required** id course that have the problem|
| traineeid  | `int` | **Required** id of student |
 problems | `string` | **Required** details of problem |
  types  | `string` | **Required** type of problem either techinical or financial |


output: problem added 

```
### 

send mail to change password

http://localhost:8000/sendemail


input 
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| email   | `string` | **Required** id mail for changing password |


output: mail sent


```
### 

view instructor rating and reviews

http://localhost:8000/sendemail


input 
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| instructorid  | `int` | **Required** id of the instructor that wants to know his rating |


output: array of strings of of rating and reviews









## screenshots


## Screenshots

![App Screenshot](https://ibb.co/drBx92Y)
![App Screenshot](https://ibb.co/NFBsYS4)
![App Screenshot](https://ibb.co/7Y8YWHg)
![App Screenshot](https://ibb.co/SBrht4h)
![App Screenshot](https://ibb.co/3YZv15m)


