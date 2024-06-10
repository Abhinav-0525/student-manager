import React, { useEffect, useState } from 'react'
import './StudentList.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function StudentList() {
    const [students, setStudents] = useState([]);
    let navigate = useNavigate();
    let i=1;
    let res;
    async function getStudents(){
        res = await axios.get("http://localhost:4000/admin-api/students");
        if(Array.isArray(res.data.payload)){
            setStudents(res.data.payload);
        }
        else{
            console.log("error while fetching students");
        }
    }

    useEffect(()=>{
        getStudents();
    },[])

    function getStudentDetails(studentObj){
        console.log("clicked")
        navigate(`/admin/students/student-details/${studentObj.rollno}`, {state:studentObj});
    }

  return (
    <div>
        <h1 className='text-center mt-5 p-4'>List of students</h1>
        <div className='container'>
            <table className='table table-hover table-secondary table-responsive table-striped text-center'>
                <thead>
                    <tr>
                        <th className='sno'>Sno</th>
                        <th className='rollno'>RollNo</th>
                        <th className='name'>Name</th>
                        <th className='cls'>Class</th>
                        <th className='details'>More details</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        students.map(student=><tr key={student.rollno}>
                            <td>{i++}</td>
                            <td>{student.rollno}</td>
                            <td>{student.name}</td>
                            <td>{student.course}</td>
                            <td><button onClick={()=>getStudentDetails(student)} className='btn btn-primary'> view more</button></td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>

    </div>
  )
}

export default StudentList