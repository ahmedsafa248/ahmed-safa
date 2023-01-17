import {useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { rateInstructor,reset } from '../features/corporate/corporateSlice'
import Spinner from '../components/Spinner'

function RateInstructor(){

    const {cid,isLoading, isError, isSuccess, message}= useSelector(
        (state)=>state.corporate)

    const{user}=useSelector((state)=>state.auth)

 
        const dispatch=useDispatch()
        const navigate=useNavigate()

  const [courses, setCourses]=useState({
    instructorid:cid.instructorid,
    traineeid: user.user._id,
    rating:null,
    // subtitles:[]
})

const {instructorid,traineeid,rating}= courses

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
            instructorid:cid.instructorid,
            traineeid: user.user._id,
            rating:rating,
        };

       // console.log(query)

       dispatch(rateInstructor(query))
       alert("rating saved")
        }
       
       
    

    if(isLoading){
        return<Spinner/>
    }
    
    
      return (
        <div className='form-group'>
            <h2 className='heading'>please enter rating from 1 to 5</h2>
            <form onSubmit={onSubmit}>
                <input className='form-control' name="rating" id="rating" placeholder="rating" value={rating} type="text" onChange={(onChange)}></input>
                <br />
                
               
                <button className='btn btn-block' onClick={(onSubmit)}>rate</button>
            </form>
        </div>
      );
}

export default RateInstructor;