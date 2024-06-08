const exp = require('express')
const app = exp();
require('dotenv').config();
const path = require('path');
const cors = require('cors');

//Provide the react build to the server
app.use(exp.static(path.join(__dirname,'../frontend/build')));

//To parse the body of req
app.use(exp.json());

//For adding images
app.use(cors());

//Importing the APIs to server
const coordApp = require('./APIs/coord-api')
const studentApp = require('./APIs/student-api')
const adminApp = require('./APIs/admin-api')

//importing mongoclint
const mongoClint = require('mongodb').MongoClient;

//Connecting to mongodb
mongoClint.connect(process.env.URL)
.then(client=>{
    //Getting db object
    const db = client.db('studentManager');
    //Getting collection object
    const coordCollection = db.collection('coordCollection');
    const studentCollection = db.collection('studentCollection');
    const adminCollection = db.collection('adminCollection');
    const announcementCollection = db.collection('announcementCollection');
    const classCollection = db.collection('classCollection');
    //Setting collection object to app to make it available to other APIs
    app.set('coordCollection',coordCollection);
    app.set('studentCollection',studentCollection);
    app.set('adminCollection',adminCollection);
    app.set('announcementCollection',announcementCollection);
    app.set('classCollection',classCollection);
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

//Assigning port to the server
app.listen(process.env.PORT,()=>{
    console.log('server is running...')
})


// features to implement:
// implement forgot password - forgot password and otp input components
// create class with class id, teacher list, subjects and student list
// make protected routes
// connect frontend and backend  -- done
// implement middleware to prevent refresh -- done
// change profile pic of students -- done
//implement todo list for students -- done
//new students and teachers doesnt have the property of class id

//teacher password - tfrN0VqQ5/
//student password - /Oh?fWnXII
//admin password - wyvz7#hf!y

//Future improvements:
// Add photo to profile
// Search bar to search for students and teachers