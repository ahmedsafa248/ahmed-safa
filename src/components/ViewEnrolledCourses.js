import {useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { getcoursebyid,reset } from '../features/corporate/corporateSlice'
import Spinner from '../components/Spinner'
import { useNavigate } from 'react-router-dom'

function ViewEnrolledCourses(){

    const {OwnCourses, isLoading, isError, isSuccess, message}= useSelector(
        (state)=>state.corporate)
const{user}=useSelector((state)=>state.auth)
 
        const dispatch=useDispatch()
        const navigate=useNavigate();

  const [courses, setCourses]=useState({
    courses:OwnCourses,
    traineeid: user.user._id,
    
})



const [displaySub, setSub]=useState(
    []
)

// const [subtitles, setSubtitles]=useState(false)


const {search}=setCourses

    const onChange=(e)=>{
        setCourses((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value,
            // [e.target.name]:type==="checkbox" ? checked:e.target.value
        }))
    }

    // function addSubtitle(x){
    //         dispatch(doNothing(x));
    //        navigate('/addSubtitles');
    
    // }
    
    function GoToCourse(x){
        
        dispatch(getcoursebyid({Courseid:x}))
        navigate('/openCourse')
    }
    const onSubmit=(e)=>{
        e.preventDefault()
        
       
       
       
          
        }
       
    
   
    

    // function DisplaySubtitles(x){
    //     setSubtitles(true);
    //     setSub(x);
    // }

    if(isLoading){
        return<Spinner/>
    }
    console.log(OwnCourses)
    return(

<div className='form-group'>

  <div>
            <h2>your courses:</h2>
            <table cellPadding="5" cellSpacing="10" className='table'>
            <thead>
                <tr className='tr'>
                    <th className='th'>Title </th>
                    <th className='th'>View This Course</th>
                    
                </tr>
            </thead>
 
            <tbody>
                {OwnCourses.map(course =>
                    <tr className='tr'>
                        <td>{course.Cname}</td>
                        <td><button onClick={()=>(GoToCourse(course.Courseid))}>Open Course</button></td>
                        
                     
                    </tr>
                )}
            </tbody>
        </table>
        </div>
</div>
    )



                }


export default ViewEnrolledCourses