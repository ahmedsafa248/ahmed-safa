
import {useSelector,useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { showRequests,reset, allowAccess } from '../features/admin/adminSlice'
import Spinner from '../components/Spinner'
import {useEffect,useState} from 'react'
//import AllowAccess from './AllowAccess'

function ShowRequests(){

    const { OwnCourses,isLoading, isError, isSuccess, message}= useSelector(
        (state)=>state.admin)

    const{user}=useSelector((state)=>state.auth)

 
        const dispatch=useDispatch()
        const navigate=useNavigate()

  const [courses, setCourses]=useState({
    Courseid:null,
    username:null,
    traineeid:null,
    Cname:null,

    // subtitles:[]
})

const {Courseid,username,traineeid,Cname}= courses
useEffect(()=>{
    dispatch(showRequests(1))

     }
,[])
    const onChange=(e)=>{
        setCourses((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value,
            // [e.target.name]:type==="checkbox" ? checked:e.target.value
        }))
    }

    function AllowAccess(Courseid,traineeid){
        const query={
            Courseid:Courseid,
            traineeid:traineeid,

        }

        dispatch(allowAccess(query))


    }

    // function GoToCourse(x){
        
    //     dispatch(getcoursebyid({Courseid:x}))
    //     navigate('/openCourse')
    // }
    
    const onSubmit=(e)=>{
        e.preventDefault()
        const query={
            Courseid:Courseid,
            username:username,
            traineeid:traineeid,
            Cname: Cname,

        };

       // console.log(query)
       alert(query.Courseid)
       dispatch(showRequests(query))
      
    //    navigate()
        }
       
       
    

    if(isLoading){
        return<Spinner/>
    }
    
    return(

        <div className='form-group'>
        
          <div>
                    <h2>course requests</h2>
                    <table cellPadding="5" cellSpacing="10" className='table'>
                    <thead>
                        <tr className='tr'>
                            <th className='th'>username </th>
                            <th className='th'>course name</th>
                            <th className='th'>give access</th>
                            
                        </tr>
                    </thead>
         
                    <tbody>
                        {OwnCourses.map(course =>
                            <tr className='tr'>
                                <td>{course.username}</td>
                                <td>{course.Cname}</td>
                                <td><button onClick={()=>(AllowAccess("6394c8d9464a2b0ac6ff1a48","6362faf554be5962694bf08a"))}>give access</button></td>
                                {/* <td><button onClick={allowAccess={}}>grant access</button></td> */}
                                {/* <td><button onClick={()=>(GiveAccess(course.Courseid,course.traineeid))}></button></td>
                                 */}
                             
                            </tr>
                        )}
                    </tbody>
                </table>
                </div>
        </div>
            )
        
        
        
                        }
        
        
        export default ShowRequests
    
      