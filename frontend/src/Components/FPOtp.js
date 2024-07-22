import React from 'react'
import {Form, Input, Button, DatePicker, Select,Row, Col, Checkbox, Flex} from 'antd'
import { useNavigate, useLocation } from 'react-router-dom';
import Box  from '@mui/material/Box';



function FPOtp() {

    let navigate = useNavigate();
    let {state} = useLocation();

    function handleSubmit(values) {
        console.log(values);
        if(values.otp === state.otp){
            navigate('/forgot-password/reset', {state: {...state}})
        }
    }

  return (
    <div>
        <Box height={100} />
        <div className='mt-4 border p-5 w-50 mx-auto shadow'>
            <Form  onFinish={handleSubmit}>
            <h5 className='fs-6 mb-4'>Please enter the One-Time Password (OTP) sent to your Email.</h5>
                <Form.Item label="One-Time Password (OTP)" name="otp" rules={[{ required: true, message: 'Please enter otp' },  {pattern: /^[0-9]{6}$/, message: 'OTP must be 6 digits'}]}>
                    <Input.OTP  formatter={(str) => str.toUpperCase()}  />
                </Form.Item>
                <Button type="primary" className='d-block mx-auto' htmlType="submit">Submit</Button>
            </Form>  
        </div>
    </div>
  )
}

export default FPOtp