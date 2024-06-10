import React from 'react'
import AddAnnouncements from '../Components/AddAnnouncements';
import ViewAnnouncements from '../Components/ViewAnnouncements';
import Box from '@mui/material/Box';

function AdminAnnouncements() {
  return (
    <>
        <Box height={100}/>
          <div>
            <div>
              <AddAnnouncements/>
            </div>
            <div className='mt-5'>
              <ViewAnnouncements/>
            </div>
    
          </div>
        </>
  )
}

export default AdminAnnouncements