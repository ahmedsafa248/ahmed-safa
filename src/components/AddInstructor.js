import {useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addInstructor,reset } from '../features/admin/adminSlice'
import Spinner from '../components/Spinner'

function AddInstructor(){

    const { isLoading, isError, isSuccess, message}= useSelector(
        (state)=>state.admin)

    const{user}=useSelector((state)=>state.auth)

 
        const dispatch=useDispatch()
        const navigate=useNavigate()

  const [courses, setCourses]=useState({
    Username:null,
    Password: null,
    // subtitles:[]
})

const {Username,Password}= courses

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
            username:Username,
            password: Password,

        };

       // console.log(query)

       dispatch(addInstructor(query))
       alert("User created")
    //    navigate()
        }
       
       
    

    if(isLoading){
        return<Spinner/>
    }
    
    
      return (
        <div className='form-group'>
            <h2 className='heading'>Add Instructor</h2>
            <h4 className='heading'>Step 1: enter username and password </h4>
            <form onSubmit={onSubmit}>
                <input className='form-control' name="Username" id="Username" placeholder="UserName" value={Username} type="text" onChange={(onChange)}></input>
                <br />
                <input className='form-control'   name="Password" id="Password" placeholder="Password" value={Password} type="text" onChange={onChange}></input>
                <br />
               
                <button className='btn btn-block' onClick={(onSubmit)}>Create</button>
            </form>
        </div>
      );
}

export default AddInstructor