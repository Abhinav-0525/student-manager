import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';

function ViewAssignments() {

    const [assignments, setAssignments] = useState([]);
    let {currentUser} = useSelector(state => state.allUserLoginReducer);
    const [file, setFile] = useState({filePath:"", id:""});

    useEffect(() => {
        getAssignments();
    },[])

    async function getAssignments() {
        let res = await axios.get(`http://localhost:4000/student-api/assignment/${currentUser.classId}`);
        if(res.data.message === 'Assignments found'){
            setAssignments(res.data.payload);
        }
    }

    async function handleFileSubmit(e) {
        e.preventDefault();
        console.log(file)
        let formData = new FormData();
        formData.append('file', file.filePath);
        formData.append('id', file.id);
        let res = await axios.put(`http://localhost:4000/student-api/assignment/${currentUser.email}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(res)
    }



  return (
    <>
    <Box height={100}/>
    <div>
        <h3 className='d-flex mt-4 justify-content-center'>Assignments</h3>
        <div className='row m-3 p-3'>
        {assignments.length!==0 ? 
        <>
            {assignments.map((assignment, index) => (
          <div key={index} className='card p-4 mb-3 bg-light'>
            
            <h5 className="mt-1" >{assignment.content}</h5>
            <div>
                <p className='lead fs-5'>Posted by: {assignment.coordName}</p>
            </div>
            <div className="d-flex lead fs-5 justify-content-between">
              
                <div className=''>
                  <p>Posted on :{assignment.postedDate}</p>
                  
                </div>

                <div>
                 <p className=''>Deadline :{assignment.submissionDate}</p>
                </div>

            </div>
            <div>
                <form className='d-flex justify-content-evenly' onSubmit={handleFileSubmit} encType='multipart/form-data'>
                    <input type="file" name="file" id="file" onChange={(e) => setFile({filePath:e.target.files[0], id:assignment._id})} accept='application/pdf, application/msword' className='form-control' />
                    <button className='btn btn-primary ms-5' type='submit'>Submit</button>
                </form>
            </div>
              
          </div>
      ))}
        </>
        :
        <>
            <h3 className='d-flex mt-4 justify-content-center'>No Assignments</h3>
        </>}

        </div>
      

    </div>
    </>
    
  )
}

export default ViewAssignments