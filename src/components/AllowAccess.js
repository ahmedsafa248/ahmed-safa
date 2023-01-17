// import {useState} from 'react'
// import {useSelector,useDispatch} from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import { allowAccess,reset } from '../features/corporate/corporateSlice'
// import Spinner from '../components/Spinner'

// function AllowAccess(){

//     const {course,isLoading, isError, isSuccess, message}= useSelector(
//         (state)=>state.corporate)

//     const{user}=useSelector((state)=>state.auth)

 
//         const dispatch=useDispatch()
//         const navigate=useNavigate()

//   const [courses, setCourses]=useState({
//     Courseid:course.Courseid,
//     username:null,
//     traineeid:course.trainee,
//     Cname:null,
//     // subtitles:[]
// })

// const {Courseid,username,traineeid,Cname}= courses

//     const onChange=(e)=>{
//         setCourses((prevState)=>({
//             ...prevState,
//             [e.target.name]:e.target.value,
//             // [e.target.name]:type==="checkbox" ? checked:e.target.value
//         }))
//     }
    
//     const onSubmit=(e)=>{
//         e.preventDefault()
//         const query={
//             Courseid:course.Courseid,
//             username:username,
//             traineeid:course.traineeid,
//             Cname:Cname,
            
//         };

//        // console.log(query)

//        dispatch(allowAccess(query))
//        alert("done")
//         }
       
       
    

//     if(isLoading){
//         return<Spinner/>
//     }
    
    
//       return (
//         <div className='form-group'>
//             <h2 className='heading'>course accessed</h2>
            
//         </div>
//       );
// }

// export default AllowAccess;