import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import student_img from '../Assets/profile_pic.webp';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './DisplayStudents.css'
import { useNavigate } from 'react-router-dom';
function DisplayStudents() {

    const [students, setStudents] = useState([]);

    useEffect(() => {
        getStudents();
    },[])

    let {currentUser} = useSelector(state => state.allUserLoginReducer)
    let navigate = useNavigate();

    async function getStudents(){
        let res = await axios.get(`${process.env.REACT_APP_API_URL}/coord-api/students/${currentUser.classId}`)
        if(res.data.message==='Students found'){
            setStudents(res.data.payload)
        }
    }

    function handleViewMore(student){
        navigate(`/coord/student/${student.rollno}`, {state: student})
    }

  return (
    <>
        <Box height={80}/>
        <h3 className='d-flex mt-4 justify-content-center'>Students List</h3>
        <div className='row row-cols-lg-5 row-cols-md-4 row-cols-sm-3 row-cols-xs-2 justify-content-center m-2 p-2'>
        {students.length===0 ? 
        <h4 className='text-center'>No Students...</h4>
        :
        <>
            {
                students.map((student, index) => (
                    <div key={index} className='card shadow border-0 m-3'>
                        <div className='card-body '>
                      <img src={student.profilePhoto || student_img} className='card-img-top p-0'  height={'130px'}  alt=""></img>
                      
                      <h5 className="mt-1 text-center" >{student.name}</h5>
                      <div>
                          <p className='lead mb-0 fs-5 text-center'>{student.rollno}</p>
                      </div>
                      </div>
                      <div className='card-footer bg-white border-0 mb-1 pt-0'>
                          <button className='btn btn-primary d-block m-auto' onClick={()=>handleViewMore(student)} >View More</button>
                      </div>
                        
                    </div>
                ))
            }
        </>}

        </div>
      
    </>
  )
}

export default DisplayStudents