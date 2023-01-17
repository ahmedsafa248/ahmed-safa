import React from 'react'
import {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import InstructorSCTSI from '../components/InstructorSCTSI'

function Dashboard(){
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {user}=useSelector((state)=>state.auth)

    useEffect(()=>{
        if(!user){
            navigate('/login')
        }
        else if(user.user.role==1){
            navigate('/admin')        }
        else if(user.user.role==2){
            navigate('/instructor')        }
        // else if(user.user.role==5){
        //         navigate('/corporate')        }
        // else if(user.user.role==3){
        //     navigate('/login')        }
        // else if(user.user.role==4){
        //     navigate('/')        }
        else if(user.user.role==5){
            navigate('/corporate')        }

    },[user,navigate])

    // const inst=false;
    // const guest=false;
    // const admin=false;
    // const indi=false;
    // const corp=false;

    // if(user.user.role==1){
    //     admin=true;
    // }
    // else if(user.user.role==2){
    //     inst=true;
    // }
    // else if(user.user.role==3){
    //     guest=true;
    // }
    // else if(user.user.role==4){
    //     indi=true;
    // }
    // else if(user.user.role==5){
    //     corp=true;
    // }

    return(<>
    {/* <InstructorSCTSI/> */}
    <section className='heading'>
        <h6>
            Welcome {user && user.user.Name}
        </h6>
        {/* <p>instructor Dashboard</p> */}
        {/* {inst? (<Link to='/login'></Link>): (<h1>true</h1>)} */}
        {/* <InstructorSCTSI/> */}
    </section>
    

    </>
        
    )
}

export default Dashboard