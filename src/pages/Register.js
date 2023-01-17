import e from 'react-dom'
import React from 'react'
import { useState,useEffect } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import { register,reset } from '../features/authSlice'
import Spinner from '../components/Spinner'
import { FaUser } from 'react-icons/fa'

function Register(){
    const [formData, setFormData]=useState({
        FirstName:'',
        LastName:'',
        Username:'',
        Email:'',
        Password:'',
        ConfirmPassword:'',
        gender:'',
        Terms:true,
    })

    const {FirstName,LastName,Username,Email,Password,ConfirmPassword,gender,Terms}= formData

    const navigate= useNavigate()
    const dispatch= useDispatch()
    const {user, isLoading, isError, isSuccess, message}= useSelector(
        (state)=>state.auth)

    useEffect(()=>{
        if(isError){
            toast.error(message)
        }
        if(isSuccess||user){
            navigate('/')
        }

        dispatch(reset())
    },[user, isError, isSuccess, message,navigate,dispatch])

   const onChange=(e)=>{
        setFormData((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value,
            // [e.target.name]:type==="checkbox" ? checked:e.target.value
        }))
    }
    const onSubmit=(e)=>{
        e.preventDefault()

        if(Password!=ConfirmPassword){
            toast.error('passwords dont match')
        }
        else{
            const userData={
                FirstName,LastName,Username,Email,Password,ConfirmPassword,gender,Terms
            }
            dispatch(register(userData))
        }
    }

    if(isLoading){
        return<Spinner/>
    }

    return(
        <>
        <section className='heading'>
            <h1>
                <FaUser/> Register
            </h1>
            <p>Please Create an Account</p>

        </section>

        <section className='form'>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                <input type="text" className='form-control' id="FirstName" name="FirstName" placeholder='Enter your first Name' value={FirstName} onChange={onChange}/>
                </div>
                <div className='form-group'>
                <input type="text" className='form-control' id="LastName" name="LastName" placeholder='Enter your last Name' value={LastName} onChange={onChange}/>
                </div>
                <div className='form-group'>
                <input type="username" className='form-control' id="Username" name="Username" placeholder='Enter your Username' value={Username} onChange={onChange}/>
                </div>
                <div className='form-group'>
                <input type="email" className='form-control' id="Email" name="Email" placeholder='Enter your Email' value={Email} onChange={onChange}/>
                </div>
                <div className='form-group'>
                <input type="password" className='form-control' id="Password" name="Password" placeholder='Enter your Password' value={Password} onChange={onChange}/>
                </div>
                <div className='form-group'>
                <input type="password" className='form-control' id="ConfirmPassword" name="ConfirmPassword" placeholder='please confrim your Password' value={ConfirmPassword} onChange={onChange}/>
                </div>
                <div className='form-group'>
                Gender:
                {/* <input type="text" className='form-control' id="gender" name="gender" placeholder='Enter your Gender, Ex: Male or Female' value={gender} onChange={onChange}/> */}
                 Male<input type="radio" className='form-control' id="gender" name="gender"  value="Male" onChange={onChange}/>  

                Female<input type="radio" className='form-control' id="gender2" name="gender"   value="Female" onChange={onChange}/> 
                </div>
                <div fontFamily='inherit'>
                Click here to agree on Terms&Conditions: <input type="checkbox" className='form-control' id="Terms" name="Terms" placeholder='Terms' value={Terms} onChange={onChange}/>
                </div>
                <div className='form-group'>
                    <button type='submit' className='btn btn-block'>submit</button>
                </div>
            </form>
        </section>
        </>
       
    )
}

export default Register