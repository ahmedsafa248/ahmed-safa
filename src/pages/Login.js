import e from 'react-dom'
import React from 'react'
import { useState,useEffect } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import { FaSignInAlt } from 'react-icons/fa'
import { login, sendEmail,reset } from '../features/authSlice'
import Spinner from '../components/Spinner'

function Login(){
    const [formData, setFormData]=useState({
        Username:'',
        Password:'',
        })

    const {Username,Password}= formData

    const navigate= useNavigate()
    const dispatch= useDispatch()
    const {user, isLoading, isError, isSuccess, message}= useSelector(
        (state)=>state.auth)


   const onChange=(e)=>{
        setFormData((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value,
        }))
    }

    useEffect(()=>{
        if(isError){
            toast.error(message)
        }
        if(isSuccess||user){
            navigate('/')
        }

        dispatch(reset())
    },[user, isError, isSuccess, message,navigate,dispatch])

    const onSubmit=(e)=>{
        e.preventDefault()
        const  userData={
            Username,
            Password
        }

        dispatch(login(userData))
    }


    if(isLoading){
        return<Spinner/>
    }

    function sendEmail(){
       navigate('/sendemail');

}
    return(
        <>
        <section>
            <h1>
                <FaSignInAlt/> Login
            </h1>
            <p>Please Sign in</p>
        </section>

        <section className='form'>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                <input type="username" className='form-control' id="Username" name="Username" placeholder='Enter your Username' value={Username} onChange={onChange}/>
                </div>
                <div className='form-group'>
                <input type="password" className='form-control' id="Password" name="Password" placeholder='Enter your Password' value={Password} onChange={onChange}/>
                </div>
                <div className='form-group'>
                    <button type='submit' className='btn btn-block'>Login</button>
                    <button className='btn' onClick={sendEmail}>Forgot your password?</button>
                </div>
            </form>
        </section>
        </>
       
    )
}

export default Login