import React, { useState } from 'react'
import './TeacherDetails.css'
import teacher from '../Assets/teacher.jpg';
import Box from '@mui/material/Box';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfilePic from '../Assets/profile_pic.webp'
import axios from 'axios';

function TeacherDetails() {

    let {currentUser, userType} = useSelector(state => state.allUserLoginReducer)
    let [photo, setPhoto] = useState("");
    let [hasPic, setHasPic] = useState(currentUser.hasPhoto);
    let user;
    let {state} = useLocation();
    if(userType === "admin"){
        user = state;
    }
    else{
        user = currentUser;
    }

    async function handleSubmit(e){
        e.preventDefault();
        let tempCoord = {...user, hasPhoto: true, profilePhoto: photo};
        let res = await axios.put('http://localhost:4000/coord-api/profile-photo', tempCoord);
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
    <Box height={100}/>
    <div className='bg-secondary p-3 mt-4'>
        <div className=' parent row-cols-sm-1'>
            <div className='me-3 p-2 bg-white'>
                {/* <div className='justify-content-center text-center d-flex '>
                    <img className='img mx-auto' src={teacher} alt="" />
                </div> */}

                {userType==='admin' || hasPic===true  ?
                <>
                    <div className='justify-content-center text-center d-flex '>
                        <img className='img mx-auto mt-3' src={user.profilePhoto || ProfilePic} alt="" />
                    </div>
                </>:<>
                    <div>
                        <form onSubmit={handleSubmit} className='row g-3 mx-auto'>
                            <label htmlFor="file-upload" className='justify-content-center'>
                                <img className='img mt-3' style={{cursor:'pointer'}} src={user.profilePhoto ||ProfilePic} alt="" />
                            </label>
                            <input 
                                type="file"
                                lable="Image"
                                name="myFile"
                                id='file-upload'
                                accept='image/png, image/jpeg'
                                style={{display:'none'}}
                                required
                                onChange={(e)=>{
                                    handleFileUpload(e)
                                }}
                            />
                            <button className='btn btn-primary mt-3 mx-auto' type='submit'>Upload image</button>
                        </form>
                    </div>
                </>}


                <div className='mt-3'>
                    <h4 className='text-center'>{user.name.toUpperCase()}</h4>
                    <h5 className='text-center'>{user.designation}</h5>
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
                    <tr>
                        <td>Qualification:</td>
                        <td>{user.qualification}</td>
                    </tr>
                    <tr>
                        <td>Coordinator to:</td>
                        <td>{user.year}-{user.branch}-{user.section}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div className='p-2 bg-white mt-2'>
            <p className='mb-0'>Address: {user.address}</p>
            <p className='mb-0'>Gender: {user.gender}</p>
        </div>
    </div>
    </>
  )
}

export default TeacherDetails