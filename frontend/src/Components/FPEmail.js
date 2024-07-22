import React from 'react'
import {Form, Input, Button,  Select} from 'antd'
import { useNavigate } from 'react-router-dom'
import Box  from '@mui/material/Box';
import axios from 'axios';


function FPEmail() {
    let navigate = useNavigate();
    async function handleSubmit(values){
        console.log(values)
        let res = await axios.get(`http://localhost:4000/${values.userType}-api/forgotPassword/${values.email}`)
        console.log(res)
        if(res.data.message==="User exists"){
            let result = await axios.get(`http://localhost:4000/${values.userType}-api/otp/${values.email}`)
            console.log(result)
            if(result.data.message==="OTP sent"){
                navigate('/forgot-password/otp', {state:{user:res.data.payload, userType:values.userType, otp:result.data.payload}})
            }
            else{
                console.log("Error while sending OTP")
            }
        }
        else{
            console.log("Invalid Email ID");
        }
    }
  return (
    <div>
        <Box height={100} />
        <div className='mt-4 border p-5 w-50 mx-auto shadow'>
            <Form labelCol={{span:6}} wrapperCol={{span:15}} onFinish={handleSubmit}>
                <h3 className='fs-6 mb-4'>Please enter your registered e-mail to recieve One-Time Password (OTP).</h3>
                <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email' }]}>
                            <Input placeholder="Enter your email" />
                        </Form.Item>
                        <Form.Item label="User Type" name="userType" rules={[{ required: true, message: 'Please select your user type' }]} valuePropName="checked">
                            <Select placeholder="Select your user type">
                                <Select.Option value="student">Student</Select.Option>
                                <Select.Option value="admin">Admin</Select.Option>
                                <Select.Option value="coord">Coordinator</Select.Option>
                            </Select>
                        </Form.Item>
                <div >
                    <Button type="primary" className='d-block mx-auto' htmlType="submit">Submit</Button>
                </div>
            </Form>
        </div>
    </div>
  )
}

export default FPEmail