import React from 'react'
import Box from '@mui/material/Box';
import PostAssignments from './PostAssignments';
import ViewAssignments from './ViewAssignments';


function Assignments() {
  return (
    <>
    <Box height={100}/>
      <div>
        <PostAssignments/>
      </div>

      <div>
        <ViewAssignments/>
      </div>
    </>
    
  )
}

export default Assignments