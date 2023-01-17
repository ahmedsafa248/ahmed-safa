import {useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { reportProblem,reset } from '../features/corporate/corporateSlice'
import Spinner from '../components/Spinner'

function ReportProblem(){

    const {cid,isLoading, isError, isSuccess, message}= useSelector(
        (state)=>state.corporate)

    const{user}=useSelector((state)=>state.auth)

 
        const dispatch=useDispatch()
        const navigate=useNavigate()

  const [courses, setCourses]=useState({
    Courseid:cid._id,
    traineeid: user.user._id,
    problems:null,
    type:null
    // subtitles:[]
})

const {Courseid,traineeid,problems,type}= courses

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
            problems:problems,
            type:type
        };

       // console.log(query)

       dispatch(reportProblem(query))
       alert("problem reported")
        }
       
       
    

    if(isLoading){
        return<Spinner/>
    }
    
    
      return (
        <div className='form-group'>
            <h2 className='heading'>please tell weather problem is technical,financial, or other</h2>
            <form onSubmit={onSubmit}>
                <input className='form-control' name="type" id="type" placeholder="type" value={type} type="text" onChange={(onChange)}></input>
                <br />
                <h2 className='heading'>please tell problem details</h2>
            <form onSubmit={onSubmit}>
                <input className='form-control' name="problems" id="problems" placeholder="problems" value={problems} type="text" onChange={(onChange)}></input>
                <br />
                
                
               
                <button className='btn btn-block' onClick={(onSubmit)}>submit</button>
            </form>
            </form>
        </div>
      );
}

export default ReportProblem;