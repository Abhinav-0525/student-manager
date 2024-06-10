import React from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import axios from 'axios';

function PostAssignments() {

    let{register,handleSubmit}=useForm();
    let {currentUser} = useSelector(state => state.allUserLoginReducer)

    async function handleSubmitButton(data){
        const obj = {
            classId:currentUser.classId,
            coordName: currentUser.name,
            content:data.content,
            postedDate: new Date().toLocaleString('en-GB',{timeZone:'Asia/Kolkata', hour12:false}),
            submissionDate : data.submissionDate,
            submissions:[]
        };  
        console.log(obj);
        let res = await axios.post('http://localhost:4000/coord-api/assignment',obj);
        if(res.data.message === 'Assignment added'){
            console.log("Assignment added");
        }
    }

  return (
    <div>
        <form className='card w-50 p-3 shadow-2 d-block m-auto mt-3' onSubmit={handleSubmit(handleSubmitButton)}>
            <div>
                <label htmlFor="content" className="form-label ">Assignment</label>
                <textarea className='form-control mb-3' id="content" rows="3" {...register('content',{required:true})}></textarea>
            </div>
            
            <div>
                    <label htmlFor="submissionDate" className="form-label ">Submission Date </label>
                <input type="date" className = "form-control mb-3" id="submissionDate" {...register('submissionDate',{required:true})}/>

            </div>

            <div>
                <button className='btn btn-primary mb-3'>Post Assignment</button>
            </div>

        </form>
    </div>
  )
}

export default PostAssignments