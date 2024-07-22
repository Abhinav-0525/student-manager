import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import './StudentToDo.css';
import DeleteIcon from '@mui/icons-material/Delete';
import CircleIcon from '@mui/icons-material/Circle';
import { nanoid } from 'nanoid';


function StudentToDo() {
    let [todos, setTodos] = useState([]);
    const [task, setTask] = useState("");
    let {currentUser} = useSelector(state=>state.allUserLoginReducer)

    useEffect(() => {
        getTodos();
    },[])

    async function getTodos() {
        let res = await axios.get(`http://localhost:4000/student-api/todo/${currentUser.email}`)
        if(Array.isArray(res.data.payload)){
            setTodos(res.data.payload)
        }
        else{
            console.log("Error occured")
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        let newTodo = {task: task, todoId : nanoid(), isCompleted:false};
        let res =  await axios.put(`http://localhost:4000/student-api/todo/${currentUser.email}`, newTodo)
        if(res.data.message === "Todo added"){
            console.log("Todo added");
            window.location.reload();
        }
    }

    async function handleDelete(todoId) {
        let res = await axios.put(`http://localhost:4000/student-api/todo/delete/${currentUser.email}`, {todoId:todoId})
        if(res.data.message === "Todo deleted"){
            setTodos(res.data.payload)
            console.log("Todo deleted");
        }
    }

    async function handleEdit(todoId, status) {
      let res;
      if(status === false){
        res = await axios.put(`http://localhost:4000/student-api/todo/edit/${currentUser.email}`, {todoId:todoId, isCompleted:true})
      }
      else{
        res = await axios.put(`http://localhost:4000/student-api/todo/edit/${currentUser.email}`, {todoId:todoId, isCompleted:false})
      }
      if(res.data.message === "Todo updated"){
        setTodos(res.data.payload)
        console.log("Todo edited");
      }
    }


  return (
    <div>
        {/* <Box height={100} /> */}
    <div className="todo-container d-block m-auto">
    <h1 className="text-center mt-5 mb-4">Todo List</h1>
    <div className="card cards-4 shadow bord ">
      <div >
        <form className="p-3 m-3 d-flex justify-content-between" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter your task..."
              onChange={(e) => setTask(e.target.value)}
              className="text-center foont flex-grow-1"/>
            <button type='submit' className="ms-2" >Add</button>
        </form>
      </div>
      <div className="task-list p-3">
        {todos.length!==0 ?
        <>
            {todos.map((task, index) => (
            <div className="task-item d-flex justify-content-between align-items-center mb-2" key={index}>
              <div className="d-flex align-items-center" onClick={() => handleEdit(task.todoId, task.isCompleted)}>
                <CircleIcon className="icon me-2" />
                {/* style={{ task.isCompleted && {textDecoration: "line-through"}}} */}
                <span className={task.isCompleted && "text-decoration-line-through"} >{task.task}</span>
              </div>
              <DeleteIcon className="icon" onClick={() => handleDelete(task.todoId)} />
            </div>
          ))}
        </>
        :
        <>
            <h5>No Tasks yet...</h5>
        </>}
      </div>
    </div>
  </div>
  </div>
  )
}

export default StudentToDo