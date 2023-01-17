import {useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AddCourse,reset } from '../features/instructor/instructorSlice'
import Spinner from '../components/Spinner'

function InstructorAddCourse(){

    const {CreatedCourse, isLoading, isError, isSuccess, message}= useSelector(
        (state)=>state.instructor)

    const{user}=useSelector((state)=>state.auth)

 
        const dispatch=useDispatch()
        const navigate=useNavigate()

  const [courses, setCourses]=useState({
    title:null,
    YoutubeVideo: null,
    instructorid: user.user._id,
    subject:null,
    cth:null,
    price:null,
    summary:null,
    // subtitles:[]
})

const {title,YoutubeVideo,subject,cth,price,summary}= courses

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
            title:title,
            YoutubeVideo: YoutubeVideo,
            instructorid: user.user._id,
            subject: subject,
            cth: cth,
            price:price,
            summary:summary,
            // subtitles:courses.subtitles

        };

       // console.log(query)

       dispatch(AddCourse(query))
       alert("Course has been added")
    //    navigate()
        }
       
       
    

    if(isLoading){
        return<Spinner/>
    }
    
    
      return (
        <div className='form-group'>
            <h2 className='heading'>Add a new Course</h2>
            <h4 className='heading'>Step 1: Course Details</h4>
            <form onSubmit={onSubmit}>
                <input className='form-control' name="title" id="title" placeholder="Title" value={title} type="text" onChange={(onChange)}></input>
                <br />
                <input className='form-control'   name="YoutubeVideo" id="YoutubeVideo" placeholder="Youtube Video link for preview" value={YoutubeVideo} type="text" onChange={onChange}></input>
                <br />
                <input className='form-control'  name="subject" id="Subject" placeholder="Subject" value={subject} type="text" onChange={onChange}></input>
                <br />
                <input className='form-control'  name="cth" id="Course_Total_Hours" placeholder="Course Total Hours" value={cth} type="number" onChange={onChange}></input>
                <br />
    
                <input className='form-control'  name="price" id="Price" placeholder="Price" value={price} type="number" onChange={onChange}></input>
                <br />
    
                <input className='form-control'  name="summary" id="Summary" placeholder="Summary" value={summary} type="text" onChange={onChange}></input>
                <br />
                <button className='btn btn-block' onClick={(onSubmit)}>Create</button>
            </form>
        </div>
      );
}

export default InstructorAddCourse