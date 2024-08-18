import React, { useEffect, useState } from 'react'
import {useForm} from 'react-hook-form'
import './Login.css'
import admin from '../Assets/admin.jpg'
import coord from '../Assets/teacher.jpg'
import student from '../Assets/student.jpg'
import book from '../Assets/book.jpg'
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLoginThunk, closeSnackBar } from '../Redux/Slices/userLoginSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link} from 'react-router-dom'
import { Snackbar, SnackbarContent } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { Button, Popover, Space } from 'antd';
import InfoIcon from '@mui/icons-material/Info';
import { grey } from '@mui/material/colors';

function Login() {
  let navigate = useNavigate();
  let{register,handleSubmit,formState:{errors}} = useForm();
  let dispatch = useDispatch();
  let {loginStatus,currentUser, userType, snackBar} = useSelector(state => state.allUserLoginReducer)
  const [showPassword, setShowPassword] = useState(false);
  const content = (
    <div>
      <p>Email: abhinavsai.janipireddy@gmail.com</p>
      <p>Password: 12345678</p>
    </div>
  );

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmitButton = (data) => {
    console.log(data);
    dispatch(userLoginThunk(data));
  }

  useEffect(()=>{
      if(loginStatus===true){
        if(userType==='coord'){
          navigate('coord')
        }
        else if(userType==='admin'){
          navigate('admin')
        }
        else if(userType==='student'){
            navigate('student')
          }
      }
  },[loginStatus])

  function handleClose(){
     dispatch(closeSnackBar());
  }


    return (
      <div login-container>
        <img  src={book} className="background-image"/>
        <form className='m-auto bg-white login-form w-50 mt-5 border border-3 p-4' onSubmit={handleSubmit(handleSubmitButton)} >

        <div className='d-flex justify-content-evenly'>
          <div> {/*Container for holding role names and pictures*/}
          <label htmlFor=" login" className='form-label mb-4  '>Login as</label>
          <div className='form-check form-check-inline'>
            <input type="radio" className='form-check-input ' id="coord" value="coord" {...register("userType")}/>
            <label htmlFor="coord" className='form-check-label '>
            <div className=" p-2">
            <img src={coord} width="80px" height="80px" className="d-block teacher_img m-auto" alt='teacher image'/>
          <div>
          <h6 className="text-center">Coordinator</h6>
          </div>
        </div>
            </label>
          </div>


          <div className='form-check form-check-inline'>
            <input type="radio" className='form-check-input' id="student" value="student" {...register("userType")}/>
            <label htmlFor="student" className='form-check-label'>
            <div className=" p-2">
            <img src={student} width="80px" height="80px" className=" student_img " alt='student image'/>
          <div>
          <h6 className="text-center">Student</h6>
          </div>
        </div>
            </label>
          </div>

          <div className='form-check form-check-inline'>
            <input type="radio" className='form-check-input' id="admin" value="admin" {...register("userType")}/>
            <label htmlFor="admin" className='form-check-label'>
            <div className=" p-2">
            <img src={admin} width="80px" height="80px" className=" admin_img " alt='admin img'/>
          <div>
          <h6 className="text-center">Admin</h6>
          </div>
        </div>
            </label>
          </div>
          </div>
          <div>
          <Space wrap>
            <Popover content={content} title="Demo Credentials for all roles:" trigger="hover">
              <Button style={{
                border: 'none', 
                boxShadow: 'none'
                }} >
                <InfoIcon sx={{color: grey[500]}}/></Button>
            </Popover>
          </Space>
          </div>
        </div>

          <div className='mb-3'>
            <label htmlFor=" email" className='form-label mb-2'>Email ID</label>
            <input type='email' id="email" className='form-control ' {...register("email",{required:true})}></input>
            {errors.username?.type==='required' && <p className='text-danger'>please enter email ID</p>}
          </div>
        
        <div className='mb-3'>
            <label htmlFor=" password" className='form-label'>Password</label>
          <div className="password-input">
            <input type={showPassword ? 'text' : 'password'} id="password" className='form-control' {...register("password", { required: true })}></input>
            <button type="button" onClick={togglePasswordVisibility} className="password-toggle-button">
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
          {errors.password?.type === 'required' && <p className='text-danger'>please enter password</p>}
          </div>
  
        <button className='btn btn-primary mt-2 w-25 d-block m-auto'>Login</button>
        
        <p className='text-center mt-3'>Forgot Password? <Link to='/forgot-password/email' className='text-decoration-none'>Click Here!</Link></p>
        </form>

        <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={snackBar.open}
      autoHideDuration={4000}
      onClose={handleClose}
    >
      <SnackbarContent
        message={
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <CancelIcon style={{ marginRight: 8 }} />
            Invalid username or password!
          </span>
        }
        style={{
          backgroundColor: 'red',
          color: 'white',
          fontWeight: 'bold',
        }}
      />
    </Snackbar>
        
      </div>
    )
}

export default Login;