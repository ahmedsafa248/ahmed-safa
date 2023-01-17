import React from 'react'
import {useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {ViewEnrolledCourses,reset } from '../features/corporate/corporateSlice'
import rateCourse from '../features/corporate/corporateSlice'
//import ViewEnrolledCourses from '../components/ViewEnrolledCourses'


function CorporateDash(){
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {user}=useSelector((state)=>state.auth)
    const [viewEnrolled,ViewEnrolled]= useState(false)
   
    // const {OwnCourses, isLoading, isError, isSuccess, message}= useSelector(
    //     (state)=>state.corporate)

    useEffect(()=>{
        if(!user){
            navigate('/login')
        }
        else if(viewEnrolled===true){
            
           
           const traineeid={ traineeid: user.user._id}
            dispatch(ViewEnrolledCourses(traineeid))
            navigate('/viewEnrolledCoursesCorp')
        }

        else if(rateCourse===true){
           
           
           const traineeid={ traineeid: user.user._id}
            dispatch(rateCourse(traineeid))
            navigate('/rateCourse')
        }

        // else if(rateCourse===true){
        //    const query={
        //     traineeid: user.user.id,
        //     Courseid:C
        //    }
        //     const traineeid= user.user.id
        //      dispatch(rateCourse(traineeid,Courseid))
        //      navigate('/rateCourse')
        //  }
      

       
    },[user,viewEnrolled,rateCourse,navigate])

   

    return(<>
    <button className='btn btn-block' onClick={()=>{ViewEnrolled(true)}}>View Enrolled Courses</button>


    

    </>
        
    )
}

export default CorporateDash