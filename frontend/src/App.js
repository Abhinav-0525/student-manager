import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Login from './Components/Login';
import CoordProfile from './Coord/CoordProfile';
import CoordRoot from './Coord/CoordRoot';
import CoordAnnouce from './Coord/CoordAnnouce';
import StudentRoot from './Student/StudentRoot';
import AdminRoot from './Admin/AdminRoot';
import StudentProfile from './Student/StudentProfile';
import StudentAnnoucements from './Student/StudentAnnouncements';
import AdminProfile from './Admin/AdminProfile';
import AdminAnnoucements from './Admin/AdminAnnouncements';
import StudentList from './Admin/StudentList';
import TeachersList from './Admin/TeachersList';
import Courses from './Admin/Courses';
import TeacherDetails from './Admin/TeacherDetails';
import StudentDetails from './Admin/StudentDetails';
import RegisterCoord from './Admin/RegisterCoord';
import RegisterStudent from './Admin/RegisterStudent';
import StudentToDo from './Student/StudentToDo';
import CreateClass from './Admin/CreateClass';
import Schedule from './Student/Schedule';
import ChangePassword from './Components/ChangePassword';
import Assignments from './Coord/Assignments';
import ViewAssignments from './Student/ViewAssignments';
import Submissions from './Coord/Submissions';
import DisplayStudents from './Coord/DisplayStudents';
import FPEmail from './Components/FPEmail';
import FPOtp from './Components/FPOtp';
import ResetPassword from './Components/ResetPassword';
import UpdatePhoto from './Components/UpdatePhoto';


function App() {

  let router = createBrowserRouter([
    {
    path:'',
    element:<Login/>,
    },
    {
      path:'/forgot-password/email',
      element:<FPEmail/>,
    },
    {
      path:'/forgot-password/otp',
      element:<FPOtp/>,
    },
    {
      path:'/forgot-password/reset',
      element:<ResetPassword/>,
    },
    {
      path:'coord',
      element:<CoordRoot/>,
      children:[
        {
          path:'',
          element:<CoordProfile/>,
        },
        {
          path:'announce',
          element:<CoordAnnouce/>,
        },
        {
          path:'assign',
          element:<Assignments/>
        },
        {
          path:'view-submissions/:id',
          element:<Submissions/>
        },
        {
          path:'students',
          element:<DisplayStudents/>
        },
        {
          path:'student/:rollno',
          element:<StudentDetails/>
        },
        {
          path:"password",
          element:<ChangePassword/>,
        },
        {
          path:"change-photo",
          element:<UpdatePhoto />
        }
      ]
    },
    {
      path:'student',
      element:<StudentRoot/>,
      children:[
        {
          path:'',
          element:<StudentProfile/>,
        },
        {
          path:'announce',
          element:<StudentAnnoucements/>,
        },
        {
          path:'todo',
          element:<StudentToDo/>,
        },
        {
          path:'class',
          element:<Schedule/>
        },
        {
          path:"password",
          element:<ChangePassword/>,
        },
        {
          path:'assign',
          element:<ViewAssignments/>
        },
        {
          path:'change-photo',
          element:<UpdatePhoto/>
        }
      ]
    },
    {
      path:'admin',
      element:<AdminRoot/>,
      children:[
        {
          path:'',
          element:<AdminProfile/>,
        },
        {
          path:'announce',
          element:<AdminAnnoucements/>,
        },
        {
          path:'coords',
          element:<TeachersList/>,
        },
        {
          path:'students',
          element:<StudentList/>,
        },
        {
          path:'courses',
          element:<Courses/>,
        },
        {
          path:'coords/coord-details/:id',
          element:<TeacherDetails/>
        },
        {
          path:'students/student-details/:id',
          element:<StudentDetails/>
        },
        {
          path:'new-coord',
          element:<RegisterCoord/>
        },
        {
          path:'new-student',
          element:<RegisterStudent/>
        },
        {
          path:'create-class',
          element:<CreateClass/>
        }
      ]
    }
    
        
  ])



  return (
    <RouterProvider router={router}/>
  );
}

export default App;
