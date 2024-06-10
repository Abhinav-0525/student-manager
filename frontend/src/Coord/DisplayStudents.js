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
        let res = await axios.get(`http://localhost:4000/coord-api/students/${currentUser.classId}`)
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
        <div className='row m-3 p-3'>
        {students.length===0 ? 
        <h4 className='text-center'>No Students...</h4>
        :
        <>
            {
                students.map((student, index) => (
                    <div key={index} className='card cards-1 p-4 mb-3 bg-light'>
                      <img src={student_img} className='card-img-top d-block mx-auto image-1'  alt=""></img>
                      
                      <h5 className="mt-1 text-center" >{student.name}</h5>
                      <div>
                          <p className='lead fs-5 text-center'>{student.rollno}</p>
                      </div>
          
                      <div>
                          <button className='btn btn-primary mt-1 d-block m-auto' onClick={()=>handleViewMore(student)} >View More</button>
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