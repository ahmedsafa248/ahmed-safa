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