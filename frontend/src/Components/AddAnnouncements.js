import React,{useState} from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import {Form, Input, Button} from 'antd'
import { Snackbar, SnackbarContent } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


function AddAnnouncements() {
  let {currentUser} = useSelector(state => state.allUserLoginReducer);
  const [announceSnack, setAnnounceSnack] = useState(false);
  let [form] = Form.useForm();

  async function handleFormSubmit(data) {    
    data.date = new Date().toLocaleString('en-GB',{timeZone:'Asia/Kolkata', hour12:false});
    data.username = currentUser.name;
    let res = await axios.post('http://localhost:4000/admin-api/announce', data)
    if(res.data.message === "Announcement added"){
      console.log("Announcement added");
      setAnnounceSnack(true);
      form.resetFields();
    }
    console.log(data);
  }

  function handleClose(event){
    setAnnounceSnack(false);
}

  return (
    // <div className='card w-75 mx-auto m-3'>
    //   <h3 className='display-6 mt-2 text-center'>Add Announcement</h3>
    //     <form className='px-3 pb-3'  onSubmit={handleSubmit(handleFormSubmit)} >
    //       <div >
    //         <label htmlFor=" title" className='form-label fs-4 mb-1'>Title</label>
    //         <input type='text' id="title" className='form-control' {...register("title")} ></input>
    //       </div>
        
    //       <div >
    //         <label htmlFor='content' className='form-label fs-4'>Content</label>
    //         <textarea className='form-control mb-3' id='content' rows="3" {...register("content")} ></textarea>
    //       </div>
    //       <div>
    //         <button type='submit' className='btn btn-success '>Add</button>
    //       </div>
    //     </form>
    //   </div>
    <div className='mt-4 border p-4 w-50 mx-auto shadow'>
            <Form  layout='vertical' onFinish={handleFormSubmit} form={form}>
                <h5 className='fs-3 lead mb-4 text-center'>Add Announcements</h5>
                <Form.Item label={<span style={{ fontSize: '1.2rem' }}>Title</span>} name="title" rules={[{ required: true, message: 'Please enter title' }]}>
                    <Input/>
                </Form.Item>
                <Form.Item label={<span style={{ fontSize: '1.2rem' }}>Announcement</span>} name="content" rules={[{ required: true, message: 'Please enter your announcement' }]}>
                    <Input.TextArea/>
                </Form.Item>
                <Button type="primary" className='d-block mx-auto' htmlType="submit">Add</Button>
            </Form>

            <Snackbar 
            anchorOrigin={{ vertical:"top", horizontal:"center" }}
            open={announceSnack}
            autoHideDuration={4000}
            severity="success"
            onClose={handleClose}>
            <SnackbarContent
            message={
            <span style={{ display: 'flex', alignItems: 'center' }}>
                <CheckCircleIcon style={{ marginRight: 8 }} />
                Announcement has been posted!
            </span>
            }
            style={{
            backgroundColor: 'green',
            color: 'white',
            fontWeight: 'bold',
            }}/> 
        </Snackbar>
        </div>
  )
}

export default AddAnnouncements