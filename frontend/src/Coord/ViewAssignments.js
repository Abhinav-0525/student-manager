import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

function ViewAssignments() {

    const [assignments, setAssignments] = useState([]);
    let {currentUser} = useSelector(state => state.allUserLoginReducer);
    let navigate = useNavigate();

    useEffect(() => {
        getAssignments();
    },[])

    async function getAssignments() {
        let res = await axios.get(`http://localhost:4000/coord-api/assignment/${currentUser.classId}`);
        if(res.data.message === 'Assignments found'){
            setAssignments(res.data.payload);
        }
    }

    async function handleSubmissions(Id) {
      let res = await axios.get(`http://localhost:4000/coord-api/assignment/submissions/${Id}`);
      console.log(res)
      if(res.data.message === 'Submissions found'){
          navigate(`/coord/view-submissions/${Id}`, {state:res.data.payload});
      }
    }



  return (
    <>
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
                <button className='btn btn-primary mt-1' onClick={()=>handleSubmissions(assignment._id)}>View Submissions</button>
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