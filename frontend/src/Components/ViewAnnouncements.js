import { useEffect, useState } from "react";
import axios from "axios";
import { Carousel } from 'antd';
import Box from '@mui/material/Box';


const contentStyle = {
  height: '170px',
  color: '#fff',
  lineHeight: '50px',
  textAlign: 'center',
  background: '#364d79',
  padding: '20px',
};

function ViewAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);

  let res;
  async function getAnnouncements() {
    res = await axios.get('http://localhost:4000/admin-api/announce');
    if(Array.isArray(res.data.payload)){
      setAnnouncements(res.data.payload);
    }
    console.log(res.data);
  }

  useEffect(() => {
    getAnnouncements();
  },[])

  
    
  return (
    <div>
        <Box height={80}></Box>
        <h3 className='d-flex display-6 justify-content-center'>Announcements</h3>
        {announcements.slice().reverse().map((announcement, index) => (
            <div key={index} className='m-3 p-2 card bg-light'>
              
              <h6 className="card-header p-2 head" style={{backgroundColor:'#4682b4',color:'black'}}>{announcement.title}</h6>
              <div className="card-body p-1">
                <p className='lead card-text my-2 mb-0'>{announcement.content}</p>
                  <div className='d-flex justify-content-between'>
                    <p className="mb-1">{announcement.date}</p>
                    <p className='d-flex mb-0'>{announcement.username}</p>
                  </div>
  
              </div>
                
            </div>
        ))}
        {/* <div>
        <Carousel arrows>
            {announcements.map((announcement, index) => (
                    <div key={index}>
                        <div style={contentStyle} className='rounded'>
                          <h3 className='rounded'>{announcement.title}</h3>
                          <p className='lead mb-0'>{announcement.content}</p>
                          <div className='d-flex justify-content-between pe-4'>
                                <p>{announcement.date}</p>
                                <p>{announcement.username}</p>
                          </div>
                          
                        </div>
                    </div>
                ))
            }
        </Carousel>
        </div> */}
    </div>
  )
  }
  export default ViewAnnouncements;