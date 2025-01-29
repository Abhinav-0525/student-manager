const exp = require('express')
const app = exp();
require('dotenv').config();
const path = require('path');
const cors = require('cors');

//Provide the react build to the server
app.use(exp.static(path.join(__dirname,'../frontend/build')));

//make the files folder static
app.use('/files',exp.static('files'))

//To parse the body of req
app.use(exp.json());

//For enabling cors
app.use(cors({
    origin: '*', // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
    credentials: true
}));

//Importing the APIs to server
const coordApp = require('./APIs/coord-api')
const studentApp = require('./APIs/student-api')
const adminApp = require('./APIs/admin-api')


//importing mongoclint
const mongoClint = require('mongodb').MongoClient;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true,
  };

//Connecting to mongodb
mongoClint.connect(process.env.MONGO_URI, options)
.then(client=>{
    //Getting db object
    const db = client.db('studentManager');
    //Getting collection object
    const coordCollection = db.collection('coordCollection');
    const studentCollection = db.collection('studentCollection');
    const adminCollection = db.collection('adminCollection');
    const announcementCollection = db.collection('announcementCollection');
    const classCollection = db.collection('classCollection');
    const assignmentCollection = db.collection('assignmentCollection');
    //Setting collection object to app to make it available to other APIs
    app.set('coordCollection',coordCollection);
    app.set('studentCollection',studentCollection);
    app.set('adminCollection',adminCollection);
    app.set('announcementCollection',announcementCollection);
    app.set('classCollection',classCollection);
    app.set('assignmentCollection',assignmentCollection);
    console.log('Connected to db');
})
.catch(err=>{
    console.log('Error in connecting to db',err);
});


//If path is coord-api then send request to coordApp
app.use('/coord-api',coordApp);
//If path is student-api then send request to studentApp
app.use('/student-api',studentApp);
//If path is admin-api then send request to adminApp
app.use('/admin-api',adminApp);

//To prevent refresh
app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname,'../frontend/build/index.html'));
})

//Error handler
app.use((err, req, res, next)=>{
    res.send({message:"Error",payload:err.message});
})

const port = process.env.PORT || 4000;
//Assigning port to the server
app.listen(port,()=>{
    console.log('server is running...')
})


// features to implement:
// implement change password with otp verification  -- done
// create class with class id, teacher list, subjects and student list  -- done
// connect frontend and backend  -- done
// implement middleware to prevent refresh -- done
// change profile pic of students -- done
//implement todo list for students -- done
// Add photo to profile -- done
//Assignments - they should expire after a certain time -- done
//Holidays - they should expire after a certain time --done -- need to add
//new students and teachers doesnt have the property of class id -- done

//teacher password - tfrN0VqQ5/ -- 12345678
//student password - /Oh?fWnXII -- 1234567 -- abhinav
//admin password - wyvz7#hf!y

//Future improvements:
// Search bar to search for students and teachers -- cancel
// make protected routes
//add attendence -- cancel
//view results -- cancel
//admin dashboard
//user profile, logout has to be placed in navbar and dashboard has to implemented for everyone -- done
//Announcements - carousel
//Edit student, teacher data -- cancel
//decrease size of teacher assignments and use antd form for submitting assignments
//student regi form -> antd
