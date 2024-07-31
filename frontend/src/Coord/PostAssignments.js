import React,{useState} from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Snackbar, SnackbarContent } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function PostAssignments({ onPostAssignment }) {

    let{register,handleSubmit}=useForm();
    let {currentUser} = useSelector(state => state.allUserLoginReducer)
    const [assignSnack, setAssignSnack] = useState(false);


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
        let res = await axios.post(`${process.env.REACT_APP_API_URL}/coord-api/assignment`,obj);
        if(res.data.message === 'Assignment added'){
            console.log("Assignment added");
            onPostAssignment();
            setAssignSnack(true);
        }
    }

    function handleClose(event){
        setAssignSnack(false);
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

        <Snackbar 
            anchorOrigin={{ vertical:"top", horizontal:"center" }}
            open={assignSnack}
            autoHideDuration={4000}
            severity="success"
            onClose={handleClose}>
            <SnackbarContent
            message={
            <span style={{ display: 'flex', alignItems: 'center' }}>
                <CheckCircleIcon style={{ marginRight: 8 }} />
                Assignment has been posted!
            </span>
            }
            style={{
            backgroundColor: 'green',
            color: 'white',
            fontWeight: 'bold',
            }}/> 
        </Snackbar>
    </div>
  )
}

export default PostAssignments