import React from 'react'
import {useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// import InstructorSCTSI from '../components/instructorSCTSI'


function InstructorDash(){
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {user}=useSelector((state)=>state.auth)
    const [ViewOwnCourses,setViewOwnCourses]= useState(false)
    const [AddCourse,setAddCourse]= useState(false)

    useEffect(()=>{
        if(!user){
            navigate('/login')
        }
        else if(user.user.role!=2){
            navigate('/login')
        }
        else if(ViewOwnCourses===true){
            navigate('/instructorViewOwnCourses')
        }
        else if(AddCourse===true){
            setViewOwnCourses(false)
            navigate('/instructorAddCourse')
        }
    },[user,ViewOwnCourses,AddCourse,navigate])

   

    return(<>
    <button className='btn btn-block' onClick={()=>{setViewOwnCourses(true)}}>View Own Courses</button>
    <button className='btn btn-block' onClick={()=>{setAddCourse(true)}}>Add a Course</button>

    

    </>
        
    )
}

export default InstructorDash