import React from 'react'
import {useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import AddCorporate from '../components/AddCorporate'
import { showRequests } from '../features/admin/adminSlice'
import ShowRequests from '../components/ShowRequests'
// import InstructorSCTSI from '../components/instructorSCTSI'


function AdminDash(){
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {user}=useSelector((state)=>state.auth)
    const [addInstructor,AddInstructor]= useState(false)
    const [addAdmin,AddAdmin]= useState(false)
    const [addCorporate,AddCorporate]= useState(false)
    const [showRequests,ShowRequests]= useState(false)

    useEffect(()=>{
        if(!user){
            navigate('/login')
        }
        else if(addInstructor===true){
            AddAdmin(false);
            AddCorporate(false);
            ShowRequests(false);
            navigate('/add_instructor')
        }
        else if(addAdmin===true){
           AddInstructor(false);
           AddCorporate(false);
           ShowRequests(false);
            navigate('/add_Admin')
        }

        else if(addCorporate===true){
            AddAdmin(false);
            AddInstructor(false);
            ShowRequests(false);
            
            navigate('/add_corporate')
         }

         else if(showRequests===true){
            AddAdmin(false);
            AddInstructor(false);
            AddCorporate(false);
            navigate('/showRequests')
         }
    },[user,addCorporate,addInstructor,addAdmin,showRequests,navigate])

   

    return(<>
    <button className='btn btn-block' onClick={()=>{AddInstructor(true)}}>Add Instructor</button>
    <button className='btn btn-block' onClick={()=>{AddAdmin(true)}}>Add Admin</button>
    <button className='btn btn-block' onClick={()=>{AddCorporate(true)}}>Add Corporate</button>
    <button className='btn btn-block' onClick={()=>{ShowRequests(true)}}>show course requests</button>
    

    

    </>
        
    )
}

export default AdminDash