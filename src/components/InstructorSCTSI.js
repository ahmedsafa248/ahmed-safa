import {useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { instructorSOCTSI,reset } from '../features/instructor/instructorSlice'
import Spinner from '../components/Spinner'

function InstructorSCTSI(){

    const {user,OwnCourses, isLoading, isError, isSuccess, message}= useSelector(
        (state)=>state.instructor)

 
        const dispatch=useDispatch()

  const [courses, setCourses]=useState({
    courses:OwnCourses,
    type: "",
    instructorid: user.user._id,
    search:"",
})

const {search}=setCourses

    const onChange=(e)=>{
        setCourses((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value,
            // [e.target.name]:type==="checkbox" ? checked:e.target.value
        }))
    }
    
    const onSubmit=(e)=>{
        e.preventDefault()
        
        if(courses.type=="subject"){
            const title= null;
            const subject= courses.search;
            const query={
                type:courses.type,instructorid:courses.instructorid,title:title,subject:subject
            }
            dispatch(instructorSOCTSI(query))
        }
        else if(courses.type=="title"){
            const title=courses.search
            const subject=null
            const query={
                type:courses.type,instructorid:courses.instructorid,title:title,subject:subject
            }
            dispatch(instructorSOCTSI(query))
        }
        else{
            const title=null
            const subject= null
            const query={
                type:courses.type,instructorid:courses.instructorid,title:title,subject:subject
            }
            dispatch(instructorSOCTSI(query))
        }
       
       
    }

    if(isLoading){
        return<Spinner/>
    }

    return(
<div className='form-group'>
<section className='heading' onSubmit={onSubmit}>
  <input className='form-control' type="text" placeholder="Search..." name="search" value={search} onChange={onChange}/> 
  <h5>Search By:</h5>
  <input type="radio" className='form-control' id="subject" name="type"  value="subject" onChange={onChange}/>  
  <label for="subject">Subject</label>   
    <input type="radio" className='form-control' id="title" name="type"   value="title" onChange={onChange}/> 
    <label htmlfor="title">Title</label> 
    <input type="radio" className='form-control' id="me" name="type"   value="none" onChange={onChange}/> 
    <label htmlfor="me">None</label>   
  <button data-inline= "true" className='btn btn-block' onClick={(onSubmit)}>Search</button>
  </section>
  <div>
            <h2>Courses taught by you:</h2>
            <table cellPadding="5" cellSpacing="10" className='table'>
            <thead>
                <tr className='tr'>
                    <th className='th'>Title </th>
                    <th className='th'>Subtitles_Total_Hours </th>
                    <th className='th'>Subject </th>
                    <th className='th'>Course_Total_Hours </th>
                    <th className='th'>Price </th>
                    <th className='th'>Rating </th>
                    <th className='th'>Instructor_Name </th>
                    <th className='th'>Summary </th>
                    <th className='th'>Popularity </th>
                </tr>
            </thead>
 
            <tbody>
                {OwnCourses.map(course =>
                    <tr>
                        <td>{course.Title}</td>
                        <td>{course.Subtitles_Total_Hours}</td>
                        <td>{course.Subject}</td>
                        <td>{course.Course_Total_Hours}</td>
                        <td>{course.Price}</td>
                        <td>{course.Rating}</td>
                        <td>{course.Instructor_Name}</td>
                        <td>{course.Summary}</td>
                        <td>{course.Popularity}</td>

                    </tr>
                )}
            </tbody>
        </table>
        </div>
</div>
    )
}

export default InstructorSCTSI