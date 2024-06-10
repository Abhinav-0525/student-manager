import React from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios';

function AddAnnouncements() {
  let {register, handleSubmit} = useForm();

  async function handleFormSubmit(data) {    
    data.date = new Date().toLocaleString('en-GB',{timeZone:'Asia/Kolkata', hour12:false});
    data.username = "srinitha";
    let res = await axios.post('http://localhost:4000/admin-api/announce', data)
    if(res.data.message === "Announcement added"){
      console.log("Announcement added");
    }
    console.log(data);
  }
  return (
    <div className='card w-75 mx-auto m-3'>
      <h3 className='display-6 mt-2 text-center'>Add Announcement</h3>
        <form className='px-3 pb-3'  onSubmit={handleSubmit(handleFormSubmit)} >
          <div >
            <label htmlFor=" title" className='form-label fs-4 mb-1'>Title</label>
            <input type='text' id="title" className='form-control' {...register("title")} ></input>
          </div>
        
          <div >
            <label htmlFor='content' className='form-label fs-4'>Content</label>
            <textarea className='form-control mb-3' id='content' rows="3" {...register("content")} ></textarea>
          </div>
          <div>
            <button type='submit' className='btn btn-success '>Add</button>
          </div>
        </form>
      </div>
  )
}

export default AddAnnouncements