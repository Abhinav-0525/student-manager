import React, {useState} from 'react'
import Box from '@mui/material/Box'
import './ChangePassword.css'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CustomSnackbar from '../Components/CustomSnackbar';
import CancelIcon from '@mui/icons-material/Cancel';


function ChangePassword() {

    let {register, handleSubmit} = useForm()
    let {currentUser, userType} = useSelector(state => state.allUserLoginReducer)
    let navigate = useNavigate()
    const [open, setOpen] = useState(false);
  const [currentSnackbar, setCurrentSnackbar] = useState({
    message: '',
    icon: null,
    backgroundColor: '',
    color: ''
  });

    async function handlePasswordSubmit(data){
        if(data.newPassword1 !== data.newPassword2){
            //alert('Password does not match')
            setCurrentSnackbar({message: 'Passwords donot match!', icon: CancelIcon, backgroundColor: 'red', color: 'white'});
            setOpen(true);
            return
        }
        else{
            data.email = currentUser.email;
            if(userType === "student"){
                let res = await axios.put(`${process.env.REACT_APP_API_URL}/student-api/changePassword`, data)
                if(res.data.message === "Wrong old password"){
                    console.log('Wrong old password')
                    setCurrentSnackbar({message: 'Incorrect existing password!', icon: CancelIcon, backgroundColor: 'red', color: 'white'});
                    setOpen(true);
                }
                if(res.data.message === "Password changed"){
                    navigate('/student')
                }
            }
            else{
                let res = await axios.put(`${process.env.REACT_APP_API_URL}/coord-api/changePassword`, data)
                if(res.data.message === "Wrong old password"){
                    console.log('Wrong old password')
                    setCurrentSnackbar({message: 'Incorrect existing password!', icon: CancelIcon, backgroundColor: 'red', color: 'white'});
                    setOpen(true);
                }
                if(res.data.message === "Password changed"){
                    //console.log("Password changed")
                    navigate('/coord')
                }
            }
        }   
    }

    const handleClose = () => {
        setOpen(false);
    };

  return (
    <>
    <Box height={100}/>
      <div className='m-3 '>
      <h3 className='text-center mb-3'>Change Password</h3>
        <form className='card shadow car w-50 p-4 d-block m-auto' onSubmit={handleSubmit(handlePasswordSubmit)}>
            <div>
                <input placeholder='Enter Old Password' type='password' {...register('oldPassword', {required:true})} className=' inp-1 d-block  m-auto form-control password mt-4'/>
            </div>

            <div>
                <input placeholder='Enter New Password' type='password' {...register('newPassword1', {required:true})} className=' inp-2 d-block  m-auto form-control password mt-4'/>
            </div>

            <div>
                <input placeholder='Re-enter new Password' type='password' {...register('newPassword2', {required:true})} className='inp-3 d-block  m-auto form-control password mt-4'/>
            </div>
           <div>
            <button type='submit' className='submit d-block m-auto  btn-1 bg-primary text-light mt-4'>Confirm Password</button>
           </div>
        </form>
      </div>

      <CustomSnackbar
        open={open}
        handleClose={handleClose}
        message= {currentSnackbar.message}
        icon={currentSnackbar.icon}
        backgroundColor={currentSnackbar.backgroundColor}
        color={currentSnackbar.color}
      />

    </>

  )
}

export default ChangePassword