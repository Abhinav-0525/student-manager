import React from 'react'
import AddAnnouncements from '../Components/AddAnnouncements';
import ViewAnnouncements from '../Components/ViewAnnouncements';
import Box from '@mui/material/Box';
import { useState } from 'react';

function CoordAnnouce() {

  const [refresh, setRefresh] = useState(false);
  // Callback function to toggle the refresh state
  const handleRefresh = () => {
    setRefresh((prev) => !prev);
  };

    return (
        <>
        <Box height={100}/>
          <div>
            <div>
              <AddAnnouncements handleRefresh={handleRefresh} />
            </div>
            <div className='mt-4'>
              <ViewAnnouncements refresh={refresh}/>
            </div>
    
          </div>
        </>
        
      )
    
}

export default CoordAnnouce