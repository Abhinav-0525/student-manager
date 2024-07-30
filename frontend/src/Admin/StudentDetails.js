import React, { useState } from 'react'
import './StudentDetails.css'
import StudentPic from '../Assets/student.jpg'
import ProfilePic from '../Assets/profile_pic.webp'
import { useLocation } from 'react-router-dom'
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux'
import axios from 'axios';

function StudentDetails() {
    let {currentUser, userType} = useSelector(state => state.allUserLoginReducer)
    let [photo, setPhoto] = useState("");
    let [hasPic, setHasPic] = useState(currentUser.hasPhoto);
    let user;
    let {state} = useLocation();
    if(userType === "admin" || userType === "coord"){
        user = state;
    }
    else{
        user = currentUser;
    }

    async function handleSubmit(e){
        e.preventDefault();
        console.log(photo)
        let tempStudent = {...user, hasPhoto: true, profilePhoto: photo};
        let res = await axios.put('http://localhost:4000/student-api/profile-photo', tempStudent);
        console.log(res);
        if(res.data.message === "Profile photo updated"){
            setHasPic(true);
            console.log('photo updated');
        }
    }

    async function handleFileUpload(e){
        let file = e.target.files[0];
        //console.log(file)
        let base64 = await convertToBase64(file);
        console.log(base64);
        setPhoto(base64); 
    }

    function convertToBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });
    }

    

  return (
    <>
    <Box height={100}></Box>
    <div className='bg-secondary p-3 mt-3'>
        <div className='parent row-cols-sm-1'>
            <div className='me-3  bg-white'>
                {/* {userType === "admin" || userType === "coord" || hasPic=== true?
                <>
                    <div className='justify-content-center text-center d-flex '>
                        <img className='img mx-auto mt-3' src={user.profilePhoto || ProfilePic } alt="" />
                    </div>
                </>:<>
                    <div>
                        <form onSubmit={handleSubmit} className='row g-3 mx-auto'>
                            <label htmlFor="file-upload" className=' justify-content-center' >
                                <img className='img mt-3' style={{cursor:'pointer'}} src={user.profilePhoto || ProfilePic} alt="" />
                            </label>
                            <input 
                                type="file"
                                lable="Image"
                                name="myFile"
                                id='file-upload'
                                accept="image/png, image/jpeg"
                                style={{display:'none'}}
                                
                                onChange={(e)=>{
                                    handleFileUpload(e)
                                }}
                            />
                            <button className='btn btn-primary mt-3 mx-auto' type='submit'>Upload image</button>
                        </form>
                    </div>
                </>} */}
                <div className='justify-content-center text-center d-flex '>
                    <img className='img mx-auto mt-3' src={user.profilePhoto || ProfilePic } alt="" />
                </div>
                
                <div className='mt-3'>
                    <h4 className='text-center'>{user.name.toUpperCase()}</h4>
                    <h5 className='text-center'>{user.course}-{user.section} {user.year}</h5>
                </div>
            </div>
            <div className='p-2 bg-white '>
                <table className='table table-hover'>
                    <tbody>
                    <tr>
                        <td>Roll No:</td>
                        <td>{user.rollno}</td>
                    </tr>
                    <tr>
                        <td>Email:</td>
                        <td>{user.email}</td>
                    </tr>
                    <tr>
                        <td>Phone:</td>
                        <td>{user.phone}</td>
                    </tr>
                    <tr>
                        <td>Date of birth:</td>
                        <td>{user.dob}</td>
                    </tr>
                    {/* <tr>
                        <td>Qualification:</td>
                        <td>{student.qualification}</td>
                    </tr> */}
                    <tr>
                        <td>Gender:</td>
                        <td>{user.gender}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div className='p-2 bg-white mt-2'>
            <p className=''>Address: {user.address}</p>
            <div className='d-flex'>
                <p className='me-5'>Caste: {user.caste}</p>
                <p className=''>Religion: {user.religion}</p>
            </div>
            
            <p className=''>Parent Name: {user.parentName}</p>
            <p className='mb-0'>Parent Phone: {user.parentPhone}</p>
        </div>
    </div>
    </>
  )
}

export default StudentDetails