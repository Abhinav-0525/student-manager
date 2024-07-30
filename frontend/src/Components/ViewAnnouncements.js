import { useEffect, useState } from "react";
import axios from "axios";
import { Carousel } from 'antd';
import { useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import CustomSnackbar from '../Components/CustomSnackbar';
import { format } from 'date-fns';


const contentStyle = {
  height: '170px',
  color: '#fff',
  lineHeight: '50px',
  textAlign: 'center',
  background: '#364d79',
  padding: '20px',
};

function ViewAnnouncements({refresh}) {
  const [announcements, setAnnouncements] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentSnackbar, setCurrentSnackbar] = useState({
    message: '',
    icon: null,
    backgroundColor: '',
    color: ''
  });
  let {currentUser} = useSelector(state => state.allUserLoginReducer)


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
  },[refresh])

  async function handleDelete(id) {
    let resp = await axios.delete(`http://localhost:4000/admin-api/announce/${id}`);
    if(resp.data.message === "Announcement deleted"){
      getAnnouncements();
      setCurrentSnackbar({message: 'Announcement has been deleted!', icon: DeleteIcon, backgroundColor: 'red', color: 'white'});
      setOpen(true);
    }
    console.log(resp)
  }

  const handleClose = () => {
    setOpen(false);
  };

  
    
  return (
    <div>
        <Box height={80}></Box>
        <h3 className='d-flex display-6 justify-content-center'>Announcements</h3>
        {announcements.length===0 ? <h3 className='d-flex display-6 justify-content-center'>You have made no Announcements!</h3> : 
          <div>
            {announcements.slice().reverse().map((announcement, index) => (
            <div key={index} className='m-3 p-2 card bg-light'>
              
              <div className="d-flex justify-content-between" style={{backgroundColor:'#4682b4',color:'black'}}>
                <h6 className="card-header p-2 head" >{announcement.title}</h6>
                {announcement.username===currentUser.name && <DeleteIcon className="mt-1 me-2" style={{cursor:'pointer'}} onClick={()=>handleDelete(announcement._id)}/>}
              </div>
              <div className="card-body p-1">
                <p className='lead card-text my-2 mb-0'>{announcement.content}</p>
                  <div className='d-flex justify-content-between'>
                    <p className="mb-1">{format(new Date(announcement.date), 'dd-MMM-yyyy')}</p>
                    <p className='d-flex mb-0'>{announcement.username}</p>
                  </div>
  
              </div>
                
            </div>
        ))}
          </div>
        }
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
          <CustomSnackbar
        open={open}
        handleClose={handleClose}
        message= {currentSnackbar.message}
        icon={currentSnackbar.icon}
        backgroundColor={currentSnackbar.backgroundColor}
        color={currentSnackbar.color}
      />
        
    </div>
  )
  }
  export default ViewAnnouncements;