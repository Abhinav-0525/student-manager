import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';
import CustomSnackbar from '../Components/CustomSnackbar';

function ViewAssignments({refresh}) {

    const [assignments, setAssignments] = useState([]);
    let {currentUser} = useSelector(state => state.allUserLoginReducer);
    let navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [currentSnackbar, setCurrentSnackbar] = useState({
      message: '',
      icon: null,
      backgroundColor: '',
      color: ''
    });

    useEffect(() => {
        getAssignments();
    },[refresh])

    async function getAssignments() {
        let res = await axios.get(`http://localhost:4000/coord-api/assignment/${currentUser.classId}`);
        if(res.data.message === 'Assignments found'){
            setAssignments(res.data.payload);
        }
    }

    async function handleSubmissions(Id) {
      let res = await axios.get(`http://localhost:4000/coord-api/assignment/submissions/${Id}`);
      //console.log(res)
      if(res.data.message === 'Submissions found'){
          navigate(`/coord/view-submissions/${Id}`, {state:res.data.payload});
      }
    }

    async function handleDelete(Id) {
      let res = await axios.delete(`http://localhost:4000/coord-api/assignment/${Id}`);
      if(res.data.message === 'Assignment deleted'){
          getAssignments();
          setCurrentSnackbar({message: 'Assignment has been deleted!', icon: DeleteIcon, backgroundColor: 'red', color: 'white'});
          setOpen(true);
      }
      //console.log(Id)
    }

    const handleClose = () => {
      setOpen(false);
    };


  return (
    <>
    <div>
        <h3 className='d-flex mt-4 justify-content-center'>Assignments</h3>
        <div className='row m-3 p-3'>
        {assignments.length!==0 ? 
        <>
            {assignments.slice().reverse().map((assignment, index) => (
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
            <div className='d-flex justify-content-between'>
                <button className='btn btn-primary mt-1' onClick={()=>handleSubmissions(assignment._id)}>View Submissions</button>
                <button className='btn btn-danger mt-1' onClick={()=>handleDelete(assignment._id)}><DeleteIcon/></button>
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
    <CustomSnackbar
        open={open}
        handleClose={handleClose}
        message= {currentSnackbar.message}
        icon={currentSnackbar.icon}
        backgroundColor={currentSnackbar.backgroundColor}
        color={currentSnackbar.color}
      />
    </>
  )
}

export default ViewAssignments