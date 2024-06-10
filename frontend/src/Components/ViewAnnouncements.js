import { useEffect, useState } from "react";
import axios from "axios";

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
        <h3 className='d-flex display-6 justify-content-center'>Announcements</h3>
        {announcements.slice().reverse().map((announcement, index) => (
            <div key={index} className='m-3 p-2 card bg-light'>
              
              <h6 className="card-header p-2 head" style={{backgroundColor:'#4682b4',color:'black'}}>{announcement.title}</h6>
              <div className="card-body p-1">
                <p className='lead card-text mb-0'>{announcement.content}</p>
                  <div className='d-flex justify-content-between'>
                    <p className="mb-1">{announcement.date}</p>
                    <p className='d-flex mb-0'>{announcement.username}</p>
                  </div>
  
              </div>
                
            </div>
        ))}
    </div>
  )
  }
  export default ViewAnnouncements;