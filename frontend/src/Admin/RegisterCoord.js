import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Snackbar } from '@mui/material';


function RegisterCoord() {
    let{register,handleSubmit,formState:{errors}} = useForm();
    const [regiSnack, setRegiSnack] = useState(false);
    let navigate = useNavigate();

    async function handleSubmitButton(obj){
        obj.classId = obj.branch+obj.section+obj.year;
        obj.profilePhoto = ""
        obj.hasPhoto = false;
        let res = await axios.post("http://localhost:4000/admin-api/coord",obj)
        if(res.data.message === 'Coordinator already exists'){
            console.log(res.data.message);
        }
        else{
            console.log(res.data.message);
            //navigate('/admin/new-coord');
            setRegiSnack(true);
        }
        console.log(obj);
    }

    function handleClose(event){
        setRegiSnack(false);
    }

  return (
    <div className='back mt-5'>
        <div className='container back-1 mt-3'>
            <div className='row'>
                {/* <div className='col-md-6 p-5 d-block m-auto'>
                    <img src={signin_img} alt="image" className='img-fluid rounded'/>
                </div> */}
           
            <div className='col-md-6 p-3 d-block m-auto' >
                <div className='cardheight  p-1'>
            <h4 className=' text-center mt-3'>Coordinater Registartion</h4>
            <form className="f-1 card shadow w-100 mt-3 p-4 d-block m-auto form" onSubmit={handleSubmit(handleSubmitButton)}>
                <div className='row row-cols-lg-2 gy-2'>
                <div className='mb-2 '>
                    <label htmlFor="name" className="form-label ">Name </label>
                    <input type="text" className="form-control" id="name" {...register('name',{required:true,minLength:4,max:6})}/>
                    {errors.name?.type==='required' && <p className='text-warning mb-0'>please enter first name</p>}

                </div>

                <div className='mb-2'>
                    <label htmlFor="email" className="form-label ">Email </label>
                    <input type="text" className="form-control" id="email" {...register('email',{required:true})}/>
                    {errors.email?.type==='required' && <p className='text-warning mb-0'>please enter email</p>}
                </div>

                <div className='mb-2'>
                    <label htmlFor="rollno" className="form-label ">Roll No </label>
                    <input type="text" className="form-control" id="rollno" {...register('rollno',{required:true})}/>
                    {errors.rollno?.type==='required' && <p className='text-warning mb-0'>please enter roll no</p>}
                </div>

                <div className='mb-2'>
                    <label htmlFor="phone" className="form-label">Phone Number </label>
                    <input type="text" className="form-control " id="phone" {...register('phone',{required:true})}/>
                    {errors.phone?.type==='required' && <p className='text-warning mb-0'>please enter phone number</p>}
              </div>

                <div className='mb-2'>
                    <label htmlFor="dob" className="form-label ">Date Of Birth </label>
                    <input type="date" className="form-control" id="dob" {...register('dob',{required:true})}/>
                    {errors.dob?.type==='required' && <p className='text-warning mb-0'>please enter date of birth</p>}
                </div>

                <div className='mb-2'>
                    <label >Gender </label>

                    <div className='form-check'>
                        <input type="radio" value="male"  id="m" className='form-check-input' {...register('gender',{required:true})}/>
                        <label htmlFor='m' className='form-check-label ' >Male</label>
                    </div> 

                    <div className='form-check'>
                        <input type="radio" value="female" id="f" className='form-check-input' {...register('gender',{required:true})}/>
                        <label htmlFor='f' className='form-check-label '>Female</label>
                    </div>
                    {errors.gender?.type==='required' && <p className='text-warning mb-0'>please select gender</p>} 
                </div>
                

                <div className='mb-2'>
                    <label htmlFor="yearOfJoin" className="form-label " >Year Of Join </label>
                    {/* <input type="text" className="form-control" id="year" {...register('year',{required:true})}/> */}
                    <select id="yearOfJoin" className='form-select' {...register('yearOfJoin',{required:true})} defaultValue="">
                        <option value="" disabled >Choose Year</option>
                        <option value="2018">2018</option>
                        <option value="2019">2019</option>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                    </select>
                    {errors.yearOfJoin && <p className='text-warning mb-0'>please select gender</p>}
                </div>

                <div className='mb-2'>
                    <label htmlFor="designation" className="form-label">Designation </label>
                    <input type="text" className="form-control" id="designation" {...register('designation',{required:true})}/>

                    {errors.designation && <p className='text-warning mb-0'>please mention designation</p>}
                </div>

                {/* <div className='mb-2'>
                    <label htmlFor='course' >Course </label>
                    <select id="course" className='form-select' {...register('course',{required:true})} defaultValue="">
                        <option value="" disabled >Choose Option</option>
                        <option value="Software Engineering">Software Engineering</option>
                        <option value="operating system"> Operating System</option>
                        <option value="computer organisation">Computer Organisation</option>
                    </select>
                    {errors.course && <p className='text-warning mb-0'>This field is required</p>}
                </div> */}

                <div className='mb-2'>
                    <label htmlFor='qualification' >Qualification </label>
                    <select id="qualification" className='form-select' {...register('qualification',{required:true})} defaultValue="">
                        <option value="" disabled >Choose Qualification</option>
                        <option value="B.Tech">B.Tech</option>
                        <option value="M.Tech"> M.Tech</option>
                        <option value="Msc">Msc</option>
                    </select>
                    {errors.qualification && <p className='text-warning mb-0'>This field is required</p>}
                </div>

                
                <div>
                <label htmlFor='address'>Address </label>
                    <textarea className='form-control' id="address" rows="2" {...register('address',{required:true})}></textarea>
                    {errors.address && <p className='text-warning mb-0'>please give address</p>}
                </div>


               
                </div>
                <div >
                    <label htmlFor="to" className="form-label ">Coordinater to </label>
                        <div className='d-flex justify-content-between align-items-center'>
                            <div className='mb-2 me-2'>
                                <label htmlFor="year" className="form-label " >Year </label>
                                <select id="year" className='form-select' {...register('year',{required:true})} defaultValue="">
                                    <option value="" disabled >Choose Year</option>
                                    <option value="1">I</option>
                                    <option value="2">II</option>
                                    <option value="3">III</option>
                                    <option value="4">IV</option>
                                </select>
                            </div>
                            <div className='mb-2 me-2'>
                                <label htmlFor="branch" className="form-label " >Branch </label>
                                <select id="branch" className='form-select' {...register('branch',{required:true})} defaultValue="">
                                    <option value="" disabled >Choose branch</option>
                                    <option value="CSE">CSE</option>
                                    <option value="IT">IT</option>
                                    <option value="ECE">ECE</option>
                                    <option value="EEE">EEE</option>
                                    <option value="AIML">AIML</option>
                                </select>
                            </div>

                            <div className='mb-2 me-2'>
                                <label htmlFor="section" className="form-label " >Section </label>
                                <select id="section" className='form-select' {...register('section',{required:true})} defaultValue="">
                                    <option value="" disabled >Choose Section</option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className='d-flex justify-content-center pt-4'>
                        <button className='btn btn-primary button '>Submit</button>
                    </div>
            </form>
            </div>
            </div>
            </div>

            <Snackbar 
            anchorOrigin={{ vertical:"bottom", horizontal:"center" }}
            open={regiSnack}
            autoHideDuration={4000}
            severity="success"
            onClose={handleClose}
            message="Coordinator registered Successfully!"
            ContentProps={{
                sx:{
                  border: "1px solid black",
                  //borderRadius: "40px",
                //   color: "black",
                  //bgcolor: "lightseagreen",
                  fontWeight: "bold",
                }
             }} >
        </Snackbar>

        </div>
        </div>
    );
}

export default RegisterCoord