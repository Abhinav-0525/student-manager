const express = require('express');
const studentApp = express.Router();
const expressAsyncHandler = require('express-async-handler');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {otpGen} = require('../PasswordGen')
const {changePassword} = require('../EmailSender')
const {ObjectId} = require('mongodb');
require('dotenv').config();
const multer = require('multer');


//Defining the storage for images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './files')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()
      cb(null, uniqueSuffix+file.originalname)
    }
  })
  
const upload = multer({ storage: storage })


//get student collection
let studentCollection;
studentApp.use((req, res, next) => {
    studentCollection = req.app.get('studentCollection');
    announcementCollection = req.app.get('announcementCollection');
    classCollection = req.app.get('classCollection');
    assignmentCollection = req.app.get('assignmentCollection');
    next();
})

//student login route
studentApp.post('/login', expressAsyncHandler(async (req, res) => {
    let student = req.body;
    let dbstudent = await studentCollection.findOne({ email: student.email });
    if (dbstudent===null) {
        res.send({message: "Invalid email"});
    }
    else {
        let status = await bcryptjs.compare(student.password, dbstudent.password);
        if (status === false) {
            res.send({message: "Invalid password"});
        }
        else {
            let signedToken = jwt.sign({email: student.email}, process.env.SECRET_KEY);
            res.send({message:"Login success", token: signedToken, payload: dbstudent});
        }
    }
}))

//modify student details
studentApp.put('/update', expressAsyncHandler(async (req, res) => {
    let newStudent = req.body;
    let oldStudent = await studentCollection.findOne({email: newStudent.email});
    newStudent.password = oldStudent.password;
    let result = await studentCollection.updateOne({email: newStudent.email}, {$set: newStudent});
    console.log(result);
    res.send({message: "Student details updated"});
}))

//view announcements
studentApp.get('/announce',expressAsyncHandler(async(req,res)=>{
    let dbAnnouncements = await announcementCollection.find({}).toArray();
    res.send({message:'Announcements found',payload:dbAnnouncements})
}))


//update details by adding profile picture
studentApp.put('/profile-photo', expressAsyncHandler(async (req, res) => {
    let newStudent = req.body;
    try{
        let result = await studentCollection.updateOne({email: newStudent.email}, {$set: {profilePhoto: newStudent.profilePhoto, hasPhoto: true}});
        console.log(result);
        res.send({message: "Profile photo updated"});
    }
    catch(err){
        console.log(err);
        res.send({message: "Profile photo not updated"});
    }
    
}))

//get todos
studentApp.get('/todo/:email', expressAsyncHandler(async (req, res) => {
   let email = req.params.email;
   let dbstudent = await studentCollection.findOne({email: email});
   res.send({message: "Todos found", payload: dbstudent.todos});
}))
    
// add todos
studentApp.put('/todo/:email', expressAsyncHandler(async (req, res) => {
    let newTodo = req.body;
    let email = req.params.email;
    let result = await studentCollection.updateOne({email: email}, {$addToSet: {todos: newTodo}});
    //console.log(result);
    res.send({message: "Todo added"});
}))

//delete todos
studentApp.put('/todo/delete/:email', expressAsyncHandler(async (req, res) => {
    let email = req.params.email;
    let todo = req.body;
    let result = await studentCollection.updateOne({email: email}, {$pull: {todos: {todoId: todo.todoId}}});
    let dbstudent = await studentCollection.findOne({email: email});
    res.send({message: "Todo deleted", payload: dbstudent.todos});
}))

//complete todo
studentApp.put('/todo/edit/:email', expressAsyncHandler(async (req, res) => {
    let email = req.params.email;
    let todoObj = req.body;
    let result = await studentCollection.updateOne({email: email, "todos.todoId": todoObj.todoId}, {$set: {"todos.$.isCompleted": todoObj.isCompleted}});
    let student = await studentCollection.findOne({email: email});
    res.send({message: "Todo updated", payload: student.todos});
}))

//get the time table (class details)
studentApp.get('/classInfo/:classId', expressAsyncHandler(async (req, res) => {
    let classId = req.params.classId;
    let dbClassInfo = await classCollection.findOne({classId: classId});
    res.send({message: "Class details found", payload: dbClassInfo});
}))

//change password
studentApp.put('/changePassword', expressAsyncHandler(async (req, res) => {
    let body = req.body;
    let dbstudent = await studentCollection.findOne({email: body.email});
    let status = await bcryptjs.compare(body.oldPassword, dbstudent.password);
    if(status){
        let newPassword = await bcryptjs.hash(body.newPassword1, 8);
        let result = await studentCollection.updateOne({email: body.email}, {$set: {password: newPassword}});
        //console.log(result)
        res.send({message: "Password changed"});
    }
    else{
        res.send({message: "Wrong old password"});
    }
}))

//get assignments
studentApp.get('/assignment/:classId', expressAsyncHandler(async (req, res) => {
    let classId = req.params.classId;
    let now = new Date();
    let dbAssignments = await assignmentCollection.find({
        classId: classId,
        submissionDate: { $gt: now.toISOString().split('T')[0] }
    }).toArray();
    res.send({message: "Assignments found", payload: dbAssignments});
}))

//upload assignment file into the submissions array
studentApp.put('/assignment/:email',upload.single('file'), expressAsyncHandler(async (req, res) => {
    let email = req.params.email;
    let dbstudent = await studentCollection.findOne({email: email});
    let assignment = {
        name: dbstudent.name,
        rollno: dbstudent.rollno,
        file: req.file.filename,
        uploadedOn: new Date().setUTCHours(0, 0, 0, 0)
    }
    console.log(req.body.id)
    let result = await assignmentCollection.updateOne({_id: new ObjectId(req.body.id)}, {$addToSet: {submissions: assignment}});
    console.log(result)
    res.send({message: "Assignment uploaded"});
}))

//forgot password - verify email
studentApp.get('/forgotPassword/:email', expressAsyncHandler(async (req, res) => {
    let email = req.params.email;
    let dbstudent = await studentCollection.findOne({email:email});
    if(dbstudent===null){
        res.send({message:"Invalid email id"});
    }
    else{
        res.send({message:"User exists", payload:dbstudent});
    }
}))

//send otp 
studentApp.get('/otp/:email', expressAsyncHandler(async (req, res) => {
    let email = req.params.email;
    let otp = otpGen();
    changePassword(email, otp);
    res.send({message: "OTP sent", payload: otp});
}))

//change password and create token
studentApp.put('/forgotPassword/:email', expressAsyncHandler(async (req, res)=>{
    let email = req.params.email;
    let body = req.body;
    let hashedPwd = await bcryptjs.hash(body.password,8);
    let result = await studentCollection.updateOne({email:email}, {$set:{password:hashedPwd}})
    let dbstudent = await studentCollection.findOne({email:email})
    let signedToken = jwt.sign({email: email}, process.env.SECRET_KEY);
    res.send({message:"Password reset", token: signedToken, payload: dbstudent, userType: "student"});
}))

module.exports = studentApp;