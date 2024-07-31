import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Snackbar } from '@mui/material';
import {Form, Input, Button, DatePicker, Select,Row, Col} from 'antd'
import Box  from '@mui/material/Box';



function RegisterCoord() {
    let{register,handleSubmit,formState:{errors}} = useForm();
    const [regiSnack, setRegiSnack] = useState(false);
    let navigate = useNavigate();
    let [form] = Form.useForm();


    async function handleSubmitButton(obj){
        obj.classId = obj.branch+obj.section+obj.year;
        obj.profilePhoto = ""
        obj.hasPhoto = false;
        obj.dob = obj.dob.format('DD-MM-YYYY');
        let res = await axios.post(`${process.env.REACT_APP_API_URL}/admin-api/coord`,obj)
        if(res.data.message === 'Coordinator already exists'){
            console.log(res.data.message);
        }
        else{
            console.log(res.data.message);
            //navigate('/admin/new-coord');
            form.resetFields();
            setRegiSnack(true);
        }
        console.log(obj);
    }

    function handleClose(event){
        setRegiSnack(false);
    }

  return (
    <div className=''>
        <Box height={100} />
<       div className='w-75 mx-auto p-3 border rounded-2 shadow'>

            <h3 className='text-center display-6 mb-4'>Register Coordinator</h3>
            <Form  labelCol={{ span: 7 }} wrapperCol={{ span: 14 }} onFinish={handleSubmitButton} form={form} >
                <Row gutter={0}>
                    <Col span={12}>
                        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter name'}]}>
                            <Input placeholder="Enter your name" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter email'}, { type: 'email', message: 'Please enter valid email' }]}>
                            <Input placeholder="Enter your email" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={0}>
                    <Col span={12}>
                <Form.Item label="Roll Number" name="rollno" rules={[{ required: true, message: 'Please enter roll number'}]}>
                    <Input placeholder="Enter your roll number" />
                </Form.Item>
                </Col>
                <Col span={12}>
                <Form.Item label="Birth Date" name="dob" rules={[{ required: true, message: 'Please enter date of birth'}]}>
                    <DatePicker placeholder="Select your date of birth" style={{ width: '100%' }} />
                </Form.Item>
                </Col>
                </Row>
                <Row gutter={0}>
                    <Col span={12}>
                        <Form.Item label="Gender" name="gender" rules={[{ required: true, message: 'Please select gender'}]}>
                        <Select placeholder="Select your gender">
                            <Select.Option value="male">Male</Select.Option>
                            <Select.Option value="female">Female</Select.Option>
                        </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                    <Form.Item label="Phone" name="phone" rules={[{ required: true, message: 'Please enter phone number'}, { pattern: /^\d{10}$/, message: 'Please enter valid phone number' }]}>
                    <Input placeholder="Enter your phone number" />
                </Form.Item>
                    </Col>
                </Row>
                <Row gutter={0}>
                    <Col span={12}>
                    <Form.Item label="Qualification" name="qualification" rules={[{ required: true, message: 'Please select qualification'}]}>
                    <Select placeholder="Select your qualification">
                        <Select.Option value="btech">B.Tech</Select.Option>
                        <Select.Option value="mtech">M.Tech</Select.Option>
                        <Select.Option value="mba">M.B.A</Select.Option>
                        <Select.Option value="msc">M.Sc</Select.Option>
                    </Select>
                </Form.Item>
                    </Col>
                    <Col span={12}>
                    <Form.Item label="Designation" name="designation" rules={[{ required: true, message: 'Please select designation'}]}>
                    <Select placeholder="Select your designation">
                        <Select.Option value="Assistant Professor">Assistant Professor</Select.Option>
                        <Select.Option value="Associate Professor">Associate Professor</Select.Option>

                    </Select>
                </Form.Item>
                    </Col>
                </Row>
                <Row gutter={0}>
                    <Col span={12}>
                        <Form.Item label="Address"  name="address"  rules={[
                            {
                              required: true,
                              message: 'Please enter address!',
                            },
                          ]}
                            >
                            <Input.TextArea />
                        </Form.Item>
                    </Col>
                </Row>
                
                <h6 className='lead ms-3 mb-3'>Coordinator to:</h6>
                <Row gutter={0}>
                    <Col span={7}>
                        <Form.Item label="Year" name="year" rules={[{ required: true, message: 'Please select year'}]}>
                            <Select placeholder="Select your year">
                                <Select.Option value="1">1st</Select.Option>
                                <Select.Option value="2">2nd</Select.Option>
                                <Select.Option value="3">3rd</Select.Option>
                                <Select.Option value="4">4th</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Branch" name="branch" rules={[{ required: true, message: 'Please select a branch'}]}>
                            <Select placeholder="Select your branch">
                                <Select.Option value="CSE">CSE</Select.Option>
                                <Select.Option value="ECE">ECE</Select.Option>
                                <Select.Option value="EEE">EEE</Select.Option>
                                <Select.Option value="MECH">MECH</Select.Option>
                                <Select.Option value="CIVIL">CIVIL</Select.Option>
                                <Select.Option value="IT">IT</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Section" name="section" rules={[{ required: true, message: 'Please select a section'}]}>
                            <Select placeholder="Select your section">
                                <Select.Option value="A">A</Select.Option>
                                <Select.Option value="B">B</Select.Option>
                                <Select.Option value="C">C</Select.Option>
                                <Select.Option value="D">D</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <div className='d-flex justify-content-center'>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </div>
            </Form>
        </div>

            <Snackbar 
            anchorOrigin={{ vertical:"top", horizontal:"center" }}
            open={regiSnack}
            autoHideDuration={4000}
            severity="success"
            onClose={handleClose}
            message="Coordinator registered Successfully!"
            ContentProps={{
                sx:{
                  border: "1px solid black",
                  fontWeight: "bold",
                }
             }} >
        </Snackbar>
        </div>
    );
}

export default RegisterCoord