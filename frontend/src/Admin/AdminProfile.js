import React from 'react'
import Box  from '@mui/material/Box'
import { useSelector } from 'react-redux'
import AddCourses from './AddCourses'
import Holiday from '../Components/Holidays'

function AdminProfile() {
  let {currentUser} = useSelector(state => state.allUserLoginReducer)

  return (
      
        <div className='mx-auto'>
          <Box height={100} />
          
          <Holiday/>
        </div>

  )
}

export default AdminProfile