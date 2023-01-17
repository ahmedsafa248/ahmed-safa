import {useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { reset } from '../features/corporate/corporateSlice'
import Spinner from '../components/Spinner'
import {rateCourse} from '../features/corporate/corporateSlice'
import { useNavigate } from 'react-router-dom'
import {reportProblem} from '../features/corporate/corporateSlice'


function OpenCourse(){

    const {cid, isLoading, isError, isSuccess, message}= useSelector(
        (state)=>state.corporate)

        const {user}=useSelector((state)=>state.auth)

        const navigate=useNavigate()
 
        const dispatch=useDispatch()

  const [courses, setCourses]=useState({
   
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
        
        
       
    }
    

    if(isLoading){
        return<Spinner/>
    }

    function rateCourse(){
        navigate('/rateCourse');
    }

    function rateInstructor(){
        navigate('/rateInstructor');
    }

    function reportProblem(){
        navigate('/reportProblem');
    }

    return(
<div className='form-group'>

            <h2>your Courses:</h2>
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
                    <th className='th'>rate course </th>
                    <th className='th'>report a problem </th>
                    <th className='th'>rate instructor </th>
                </tr>
            </thead>
 
            <tbody>
           
                <tr>
                    <td>{cid.Title}</td>
                    <td>{cid.Subtitles_Total_Hours}</td>
                    <td>{cid.Subject}</td>
                    <td>{cid.Course_Total_Hours}</td>
                    <td>{cid.Price}</td>
                    <td>{cid.Rating}</td>
                    <td>{cid.Instructor_Name}</td>
                    <td>{cid.Summary}</td>
                    <td>{cid.Popularity}</td>
                    
                  
                    <td><button onClick={rateCourse}>rate course</button></td>
                    <td> <button onClick={reportProblem}>report Problem</button></td>
                    <td><button onClick={rateInstructor}>rate instructor</button></td>
                

                </tr>
           
            </tbody>
        </table>
        </div>

    )
}

export default OpenCourse