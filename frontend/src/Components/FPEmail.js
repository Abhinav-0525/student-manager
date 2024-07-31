import React, {useState} from 'react'
import {Form, Input, Button,  Select} from 'antd'
import { useNavigate } from 'react-router-dom'
import Box  from '@mui/material/Box';
import CustomSnackbar from '../Components/CustomSnackbar';
import axios from 'axios';
import CancelIcon from '@mui/icons-material/Cancel';


function FPEmail() {
    let navigate = useNavigate();
    const [open, setOpen] = useState(false);
  const [currentSnackbar, setCurrentSnackbar] = useState({
    message: '',
    icon: null,
    backgroundColor: '',
    color: ''
  });

    async function handleSubmit(values){
        let res = await axios.get(`${process.env.REACT_APP_API_URL}/${values.userType}-api/forgotPassword/${values.email}`)
        console.log(res)
        if(res.data.message==="User exists"){
            let result = await axios.get(`${process.env.REACT_APP_API_URL}/${values.userType}-api/otp/${values.email}`)
            console.log(result)
            if(result.data.message==="OTP sent"){
                navigate('/forgot-password/otp', {state:{user:res.data.payload, userType:values.userType, otp:result.data.payload}})
            }
            else{
                console.log("Error while sending OTP")
                setCurrentSnackbar({message: 'Error while sending OTP!', icon: CancelIcon, backgroundColor: 'red', color: 'white'});
                setOpen(true);
            }
        }
        else{
            console.log("Invalid Email ID");
            setCurrentSnackbar({message: 'Invalid Email ID!', icon: CancelIcon, backgroundColor: 'red', color: 'white'});
            setOpen(true);
        }
    }

    const handleClose = () => {
        setOpen(false);
    };

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
        <CustomSnackbar
        open={open}
        handleClose={handleClose}
        message= {currentSnackbar.message}
        icon={currentSnackbar.icon}
        backgroundColor={currentSnackbar.backgroundColor}
        color={currentSnackbar.color}
      />
    </div>
  )
}

export default FPEmail