import React, { useState } from 'react'
import './TeachersList.css';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function TeachersList() {

    const [teachers, setTeachers] = useState([]);
    let navigate = useNavigate();
    let i = 1;
    let res;
    async function getTeachers() {
        res = await axios.get(`${process.env.REACT_APP_API_URL}/admin-api/coords`)
        console.log(res)
        if(Array.isArray(res.data.payload)) {
            setTeachers(res.data.payload)
        }
        else{
            console.log("error, no coordinators found")
        }
    }

    useEffect(() => {
        getTeachers();
    },[])

    function getTeacherDetails(teacherObj) {
        console.log("clicked")
        navigate(`/admin/coords/coord-details/${teacherObj.rollno}`, {state:teacherObj})
    }

  return (
    <div>
        <h1 className='text-center mt-5 p-4'>List of teachers</h1>
        <div className='container'>
            <table className='table table-secondary table-hover table-responsive table-striped text-center'>
                <thead>
                    <tr>
                        <th className='sno'>Sno</th>
                        <th className='no'>ID</th>
                        <th className='name'>Name</th>
                        <th className='cls'>Class</th>
                        <th className='details'>More details</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        teachers.map(teacher=><tr key={teacher.rollno}>
                            <td>{i++}</td>
                            <td>{teacher.rollno}</td>
                            <td>{teacher.name}</td>
                            <td>{teacher.year}-{teacher.branch}-{teacher.section}</td>
                            <td><button onClick={()=>getTeacherDetails(teacher)} className='btn btn-primary'> view more</button></td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>

    </div>
  )
}

export default TeachersList