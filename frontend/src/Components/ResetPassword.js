import React, { useEffect} from 'react'
import {Form, Input, Button, DatePicker, Select,Row, Col, Checkbox, Flex} from 'antd'
import Box  from '@mui/material/Box';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { userPasswordResetThunk } from '../Redux/Slices/userLoginSlice'

function ResetPassword() {
    const navigate = useNavigate();
    const {state} = useLocation();
    const dispatch = useDispatch();
    let {loginStatus, userType} = useSelector(state => state.allUserLoginReducer)


    //compare both the passwords
    const comparePasswords = ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value || getFieldValue('password') === value) {
            return Promise.resolve();
          }
          return Promise.reject(new Error('Passwords do not match'));
        },
      });

    function handleSubmit(values){
        console.log(values)
        let obj = {password:values.password, userType:state.userType, email:state.user.email}
        dispatch(userPasswordResetThunk(obj))
    }

    useEffect(()=>{
        if(loginStatus===true){
          if(userType==='coord'){
            navigate('/coord')
          }
          else if(userType==='admin'){
            navigate('/admin')
          }
          else if(userType==='student'){
              navigate('/student')
            }
        }
    },[loginStatus])

  return (
    <div>
        <Box height={100} />
        <div className='mt-4 border p-4 w-50 mx-auto shadow'>
            <Form labelCol={{ span: 10 }} wrapperCol={{ span: 13 }} onFinish={handleSubmit}>
                <h5 className='fs-4 mb-4 text-center'>Reset Password</h5>
                <Form.Item label="Enter your password" name="password" rules={[{ required: true, message: 'Please enter your password' }]}>
                    <Input.Password/>
                </Form.Item>
                <Form.Item label="Confirm your password" name="confirm" dependencies={['password']}  rules={[{ required: true, message: 'Please confirm your password' }, comparePasswords]}>
                    <Input.Password />
                </Form.Item>

                <Button type="primary" className='d-block mx-auto' htmlType="submit">Reset</Button>
            </Form>  
        </div>
    </div>
  )
}

export default ResetPassword