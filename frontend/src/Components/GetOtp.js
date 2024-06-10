import React from 'react'
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function GetOtp() {
    let {currentUser} = useSelector((state)=>state.allUserLoginReducer)
    let navigate = useNavigate()

    async function handleOTP(e){
        e.preventDefault();
        let res = await axios.get(`http://localhost:4000/student-api/otp/${currentUser.email}`)
        if(res.data.message ==="OTP sent"){
            console.log("OTP sent")
            navigate('/student/verify', {state:{otp:res.data.payload, email:currentUser.email}})
        }
        // console.log("otp send")
        // navigate('/student/verify')
    }

    return (
        <>
        <Box height={100}/>
          <div className='m-3 '>
          <h3 className='text-center mb-3'>Change Password</h3>
            <form className='card w-50 d-block m-auto' onSubmit={(e)=>handleOTP(e)}>
                <p>Click the below button to get otp to your registered mail id: <span className='text-primary'>{currentUser.email}</span>.</p>
               <div>
                <button className='submit'>Send OTP</button>
               </div>
            </form>
          </div>
        </>
        
      )
    
}

export default GetOtp