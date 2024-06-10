import React from 'react'
import Box from '@mui/material/Box';
import './Submissions.css'
import { useLocation } from 'react-router-dom';

function Submissions() {

    let {state} = useLocation();

    function handleFileOpen(file) {
        window.open(`http://localhost:4000/files/${file}`, '_blank', 'noreferror');
    }


  return (
    <>
    <Box height={50}/>
    <div>
        <h2 className='d-flex mt-4 justify-content-center'>Assignments</h2>
        <div className='row m-3 p-3'>
        {state.length===0 ? 
        <>
            <h3 className='d-flex mt-4 justify-content-center'>No Assignments</h3>
        </>
        :
        <>
            {
                state.map((submission, index) => (
                    <div key={index} className='card card-3 shadow p-4 mb-3'>
                      
                      <h4 className="mt-1 mb-3" >{submission.name}</h4>
          
                      <div>
                          <h6 className='lead mb-3'>{submission.rollno}</h6>
                      </div>
          
                      <div >
                          <h6 className='lead mb-3'>Submitted Date: {submission.uploadedOn}</h6>  
                      </div>
          
                      <div>
                          <button className='btn btn-primary mt-1' onClick={()=>handleFileOpen(submission.file)} >View Assignment</button>
                      </div>
                        
                    </div>
                ))
            }
        </>}

        </div>

    </div>
    </>
    
  )
}

export default Submissions