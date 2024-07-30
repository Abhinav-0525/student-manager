import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { Snackbar, SnackbarContent } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function ViewAssignments() {

    const [assignments, setAssignments] = useState([]);
    const [refresh, setRefresh] = useState(false)
    let {currentUser} = useSelector(state => state.allUserLoginReducer);
    const [file, setFile] = useState({filePath:"", id:""});
    const [assignSnack, setAssignSnack] = useState(false);


    useEffect(() => {
        getAssignments();
    },[refresh])

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
        //formData.reset();
        //console.log(res)
        setAssignSnack(true);
        setRefresh(prev => !prev);
    }

    function handleClose(event){
        setAssignSnack(false);
    }
    
    function isSubmitted(submissions, rollno){
        let status = submissions.find((submission)=>{
            return submission.rollno === rollno;})
        return status ? true : false;
    }


  return (
    <>
    <Box height={100}/>
    <div>
        <h3 className='d-flex display-6 justify-content-center'>Assignments</h3>
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
                {/* Display this form only if the student didnt submit the assignment */}
                {isSubmitted(assignment.submissions, currentUser.rollno) ? <p className='lead d-flex mt-2 justify-content-center'>Assignment Submitted</p>:
                    <form className='d-flex justify-content-evenly' onSubmit={handleFileSubmit} encType='multipart/form-data'>
                    <input type="file" name="file" id="file" onChange={(e) => setFile({filePath:e.target.files[0], id:assignment._id})} accept='application/pdf, application/msword, .ppt, .pptx' className='form-control' />
                    <button className='btn btn-primary ms-5' type='submit'>Submit</button>
                    </form>
                }
                
            </div>
              
          </div>
      ))}
        </>
        :
        <>
            <h3 className='d-flex mt-4 justify-content-center'>No Assignments</h3>
        </>}

        </div>
        <Snackbar 
            anchorOrigin={{ vertical:"top", horizontal:"center" }}
            open={assignSnack}
            autoHideDuration={4000}
            severity="success"
            onClose={handleClose}>
            <SnackbarContent
            message={
            <span style={{ display: 'flex', alignItems: 'center' }}>
                <CheckCircleIcon style={{ marginRight: 8 }} />
                Assignment has been submitted!
            </span>
            }
            style={{
            backgroundColor: 'green',
            color: 'white',
            fontWeight: 'bold',
            }}/> 
        </Snackbar>

    </div>
    </>
    
  )
}

export default ViewAssignments