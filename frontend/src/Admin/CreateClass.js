import React from 'react'
import './CreateClass.css'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import Box from '@mui/material/Box';
import { Snackbar } from '@mui/material';


function CreateClass() {

    let {handleSubmit, register, formState: { errors }} = useForm();
    const [createSnack, setCreateSnack] = useState(false);

    async function handleFormSubmit(data) {
        let monday = ["Monday",data.Mon1Period, data.Mon2Period, data.Mon3Period,"Lunch", data.Mon4Period, data.Mon5Period, data.Mon6Period];
        let tuesday = ["Tuesday",data.Tue1Period, data.Tue2Period, data.Tue3Period, "Lunch", data.Tue4Period, data.Tue5Period, data.Tue6Period];
        let wednesday = ["Wednesday",data.Wed1Period, data.Wed2Period, data.Wed3Period, "Lunch", data.Wed4Period, data.Wed5Period, data.Wed6Period];
        let thursday = ["Thursday",data.Thu1Period, data.Thu2Period, data.Thu3Period, "Lunch", data.Thu4Period, data.Thu5Period, data.Thu6Period];
        let friday = ["Friday",data.Fri1Period, data.Fri2Period, data.Fri3Period, "Lunch", data.Fri4Period, data.Fri5Period, data.Fri6Period];
        let saturday = ["Saturday",data.Sat1Period, data.Sat2Period, data.Sat3Period, "Lunch", data.Sat4Period, data.Sat5Period, data.Sat6Period];
        let tableHeader = ["Day / time", "10-11am", "11-12pm", "12-1pm", "1-1:40pm", "1:40-2:40pm", "2:40-3:40pm","3:40-4:40pm"];
        let tableContent = [tableHeader, monday, tuesday, wednesday, thursday, friday, saturday];
        let newClass = {
            classId: data.branch+data.section+data.year,
            branch: data.branch,
            year: data.year,
            section: data.section,
            timeTable:tableContent
        }
        console.log(newClass)
        let res = await axios.post(`${process.env.REACT_APP_API_URL}/admin-api/class`, newClass)
        console.log(res)
        if(res.data.message === 'Class created'){
            console.log('Class created')
            setCreateSnack(true);
        }
        if(res.data.message === 'Class already exists'){
            console.log('Class already exists')
        }
    }

    function handleClose(event){
        setCreateSnack(false);
    }


  return (
    <div className='mt-5'>
        <Box height={80}></Box>
        <h3 className='text-center'>Create Class</h3>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className='d-flex p-3 m-3'>
                <select className='form-select me-3'  {...register("branch", { required: true })}>
                    <option disabled value="branch"  key="default">Choose Branch</option>
                    <option value="IT" key="IT">IT</option>
                    <option value="CSE" key="CSE">CSE</option>
                    <option value="EEE" key="EEE">EEE</option>
                    <option value="ECE" key="ECE">ECE</option>
                    <option value="MECH" key="MECH">MECH</option>
                </select>
                <select className='form-select me-3' {...register("year", { required: true })} >
                <option disabled value="year" key="default">Choose Year</option>
                    <option value="1" key="1">1st Year</option>
                    <option value="2" key="2">2nd Year</option>
                    <option value="3" key="3">3rd Year</option>
                    <option value="4" key="4">4th Year</option>
                </select>
                <select className='form-select' defaultValue={'choose'} {...register("section", { required: true })}>
                <option disabled value="section"  key="default">Choose section</option>
                    <option value="A" key="A">A section</option>
                    <option value="B" key="B">B section</option>
                    <option value="C" key="C">C section</option>
                    <option value="D" key="D">D section</option>
                </select>
            </div>
            <div className='w-100 p-3'>
            <table className='table'>
                <thead>
                    <tr key="">
                        <td>Day / Time</td>
                        <td>10-11am</td>
                        <td>11-12pm</td>
                        <td>12-1pm</td>
                        <td>1:40-2:40pm</td>
                        <td>2:40-3:40pm</td>
                        <td>3:40-4:40pm</td>
                    </tr>
                </thead>
                <tbody>
                    <tr key="">
                        <td>Monday</td>
                        <td><input type="text" className='form-control w-75' {...register("Mon1Period", { required: true })} placeholder="Mon1Period" /></td>
                        <td><input type="text" className='form-control w-75' {...register("Mon2Period", { required: true })} placeholder="Mon2Period" /></td>
                        <td><input type="text" className='form-control w-75' {...register("Mon3Period", { required: true })} placeholder="Mon3Period" /></td>
                        <td><input type="text" className='form-control w-75' {...register("Mon4Period", { required: true })} placeholder="Mon4Period" /></td>
                        <td><input type="text" className='form-control w-75' {...register("Mon5Period", { required: true })} placeholder="Mon5Period" /></td>
                        <td><input type="text" className='form-control w-75' {...register("Mon6Period", { required: true })} placeholder="Mon6Period" /></td>
                    </tr>
                    <tr key="">
                        <td>Tuesday</td>
                        <td><input type="text" className='form-control w-75' {...register("Tue1Period", { required: true })} placeholder="Tue1Period" /></td>
                        <td><input type="text" className='form-control w-75' {...register("Tue2Period", { required: true })} placeholder="Tue2Period" /></td>
                        <td><input type="text" className='form-control w-75' {...register("Tue3Period", { required: true })} placeholder="Tue3Period" /></td>
                        <td><input type="text" className='form-control w-75' {...register("Tue4Period", { required: true })} placeholder="Tue4Period" /></td>
                        <td><input type="text" className='form-control w-75' {...register("Tue5Period", { required: true })} placeholder="Tue5Period" /></td>
                        <td><input type="text" className='form-control w-75' {...register("Tue6Period", { required: true })} placeholder="Tue6Period" /></td>
                    </tr>
                    <tr key="">
                        <td>Wednesday</td>
                        <td><input type="text" className='form-control w-75' {...register("Wed1Period", { required: true })} placeholder="Wed1Period" /></td>
                        <td><input type="text" className='form-control w-75' {...register("Wed2Period", { required: true })} placeholder="Wed2Period" /></td>
                        <td><input type="text" className='form-control w-75' {...register("Wed3Period", { required: true })} placeholder="Wed3Period" /></td>
                        <td><input type="text" className='form-control w-75' {...register("Wed4Period", { required: true })} placeholder="Wed4Period" /></td>
                        <td><input type="text" className='form-control w-75' {...register("Wed5Period", { required: true })} placeholder="Wed5Period" /></td>
                        <td><input type="text" className='form-control w-75' {...register("Wed6Period", { required: true })} placeholder="Wed6Period" /></td>
                    </tr>
                    <tr key="">
                        <td>Thursday</td>
                        <td><input type="text" className='form-control w-75' {...register("Thu1Period", { required: true })} placeholder="Thu1Period" /></td>
                        <td><input type="text" className='form-control w-75' {...register("Thu2Period", { required: true })} placeholder="Thu2Period" /></td>
                        <td><input type="text" className='form-control w-75' {...register("Thu3Period", { required: true })} placeholder="Thu3Period" /></td>
                        <td><input type="text" className='form-control w-75' {...register("Thu4Period", { required: true })} placeholder="Thu4Period" /></td>
                        <td><input type="text" className='form-control w-75' {...register("Thu5Period", { required: true })} placeholder="Thu5Period" /></td>
                        <td><input type="text" className='form-control w-75' {...register("Thu6Period", { required: true })} placeholder="Thu6Period" /></td>
                    </tr>
                    <tr key="">
                        <td>Friday</td>
                        <td><input type="text" className='form-control w-75' {...register("Fri1Period", { required: true })} placeholder="Fri1Period" /></td>
                        <td><input type="text" className='form-control w-75' {...register("Fri2Period", { required: true })} placeholder="Fri2Period" /></td>
                        <td><input type="text" className='form-control w-75' {...register("Fri3Period", { required: true })} placeholder="Fri3Period" /></td>
                        <td><input type="text" className='form-control w-75' {...register("Fri4Period", { required: true })} placeholder="Fri4Period" /></td>
                        <td><input type="text" className='form-control w-75' {...register("Fri5Period", { required: true })} placeholder="Fri5Period" /></td>
                        <td><input type="text" className='form-control w-75' {...register("Fri6Period", { required: true })} placeholder="Fri6Period" /></td>
                    </tr>
                    <tr key="">
                        <td>Saturday</td>
                        <td><input type="text" className='form-control w-75 display-5' {...register("Sat1Period", { required: true })} placeholder="Sat1Period" /></td>
                        <td><input type="text" className='form-control w-75' {...register("Sat2Period", { required: true })} placeholder="Sat2Period" /></td>
                        <td><input type="text" className='form-control w-75' {...register("Sat3Period", { required: true })} placeholder="Sat3Period" /></td>
                        <td><input type="text" className='form-control w-75' {...register("Sat4Period", { required: true })} placeholder="Sat4Period" /></td>
                        <td><input type="text" className='form-control w-75' {...register("Sat5Period", { required: true })} placeholder="Sat5Period" /></td>
                        <td><input type="text" className='form-control w-75' {...register("Sat6Period", { required: true })} placeholder="Sat6Period" /></td>
                    </tr>
                </tbody>
            </table>
            </div>
            
            <button type='submit' className='btn btn-primary'>Create Class</button>
        </form>

        <Snackbar 
            anchorOrigin={{ vertical:"bottom", horizontal:"center" }}
            open={createSnack}
            autoHideDuration={4000}
            severity="success"
            onClose={handleClose}
            message="Class has been Created!"
            ContentProps={{
                sx:{
                  border: "1px solid black",
                  //borderRadius: "40px",
                //   color: "black",
                  //bgcolor: "lightseagreen",
                  fontWeight: "bold",
                }
             }} >
        </Snackbar>

    </div>
  )
}

export default CreateClass