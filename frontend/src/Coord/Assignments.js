import React from 'react'
import Box from '@mui/material/Box';
import PostAssignments from './PostAssignments';
import ViewAssignments from './ViewAssignments';
import { useState } from 'react';


function Assignments() {

  const [refresh, setRefresh] = useState(false);
  // Callback function to toggle the refresh state
  const handleRefresh = () => {
    setRefresh((prev) => !prev);
  };
  
  return (
    <>
    <Box height={100}/>
      <div>
        <PostAssignments onPostAssignment={handleRefresh} />
      </div>

      <div>
        <ViewAssignments refresh={refresh}/>
      </div>
    </>
    
  )
}

export default Assignments