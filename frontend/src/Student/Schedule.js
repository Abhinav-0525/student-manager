import React, { useState, useEffect} from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import Box  from '@mui/material/Box';

function Schedule() {

    let [classInfo, setClassInfo] = useState({ timeTable: [], classId: "", branch: "", year: "", section: ""});
    let {currentUser} = useSelector(state => state.allUserLoginReducer)

    async function getClassInfo(){
        let res = await axios.get(`http://localhost:4000/student-api/classInfo/${currentUser.classId}`);
        
        console.log(res)
        if(res.data.message === "Class details found"){
            setClassInfo({...res.data.payload});
            console.log(res.data.payload)
            console.log(classInfo)
            console.log("Class details found")
        }
    }

    useEffect(()=>{
        getClassInfo();
    },[])

  return (
    <div>
        <Box height={100} />
        {classInfo.timeTable.length === 0?
        <>
            <h2 className='text-center text-danger'>No Class found</h2>
        </>
        :
        <>
            <h1 className='text-center mt-2 p-4'>{classInfo.year}-year {classInfo.branch}-{classInfo.section} Schedule</h1>
            <div className='container'>
                <table className='table table-secondary table-hover table-responsive table-striped text-center'>
                    {/* <thead>
                        <tr>
                            <th className='time-table'>Day</th>
                            <th className='head-1'>10-11 am</th>
                            <th className='head-2'>11-12 pm</th>
                            <th claswsName='head-3'>12-1 pm</th>
                            <th className='head-4'>1-1:40 pm</th>
                            <th className='head-5'>1:40-2:40 pm</th>
                            <th className='head-6'>2:40:3-40 pm</th>
                            <th className='head-7'>3:40-4:40 pm</th>
                        </tr>
                    </thead> */}
                    <tbody>
                    {classInfo.timeTable.map((time, index)=>{
                      return(
                          <tr key={index}>
                        <td>{time[0]}</td>
                        <td>{time[1]}</td>
                        <td>{time[2]}</td>
                        <td>{time[3]}</td>
                        <td>{time[4]}</td>
                        <td>{time[5]}</td>
                        <td>{time[6]}</td>
                        <td>{time[7]}</td>
                      </tr>
                      )    
                    })}
                    </tbody>
                </table>
            </div>
        </>}
    </div>
    // <div>
    //     <Box height={100} />
    //     <h2>Schedule</h2>
    // </div>
    
  )
}

export default Schedule