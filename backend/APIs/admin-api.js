const exp = require('express');
const adminApp = exp.Router();
const expressAsyncHandler = require('express-async-handler');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {passGen, otpGen} = require('../PasswordGen'); // password generator function
const {mailer, changePassword} = require('../EmailSender'); // mailer function - this accepts the email and password of the student and sends the mail
require('dotenv').config();
const {ObjectId} = require('mongodb');


let studentCollection, coordCollection, adminCollection;
adminApp.use((req,res,next)=>{
    studentCollection = req.app.get('studentCollection');
    coordCollection = req.app.get('coordCollection');
    adminCollection = req.app.get('adminCollection');
    announcementCollection = req.app.get('announcementCollection');
    classCollection = req.app.get('classCollection');
    next();
})

//admin registration -- just for registration, no frontend 
adminApp.post('/admin',expressAsyncHandler(async(req,res)=>{
    let admin = req.body;
    let dbAdmin = await adminCollection.findOne({email:admin.email});
    if(dbAdmin===null){
        let password = passGen();
        mailer(admin.email,password); //sends the mail with new password to the student
        //let hashedPwd = await bcryptjs.hash(password,8);
        admin.password = password;
        await adminCollection.insertOne(admin);
        res.send({message:'Admin registered and mail sent'})
    }
    else{
        res.send({message:'Admin already exists'})
    }
}))


//admin login
adminApp.post('/login',expressAsyncHandler(async(req,res)=>{
    let admin = req.body;
    let dbAdmin = await adminCollection.findOne({email:admin.email});
    if(dbAdmin===null){
        res.send({message:'Invalid email'})
    }
    else{
        if(admin.password===dbAdmin.password){
            let signedToken = jwt.sign({email:admin.email},process.env.SECRET_KEY);
            res.send({message:'Login success',token:signedToken,payload:dbAdmin})
        }
        else{
            res.send({message:'Invalid password'})
        }
    }
}))

//student registration
adminApp.post('/student',expressAsyncHandler(async(req,res)=>{
    let student = req.body;
    //Check if student already exists
    let dbStudent = await studentCollection.findOne({email:student.email});
    //If student does not exist, insert student into database
    if(dbStudent===null){
        //Hash the password and replace the password field with the hashed password
        let password = passGen(); //generates a random password
        mailer(student.email,password); //sends the mail with new password to the student
        let hashedPwd = await bcryptjs.hash(password,8);
        student.password = hashedPwd;
        await studentCollection.insertOne(student);
        res.send({message:'Student registered and mail sent'})
    }
    else{
        res.send({message:'Student already exists'})
    }
}))

//coordinator registration
adminApp.post('/coord',expressAsyncHandler(async(req,res)=>{
    let coordinator = req.body;
    let dbCoordinator = await coordCollection.findOne({email:coordinator.email});
    if(dbCoordinator===null){
        let password = passGen(); //generates a random password
        mailer(coordinator.email,password);
        let hashedPwd = await bcryptjs.hash(password,8);
        coordinator.password = hashedPwd;
        await coordCollection.insertOne(coordinator);
        res.send({message:'Coordinator Registered and mail sent'})
    }
    else{
        res.send({message:'Coordinator already exists'})
    }
}))

//search for a particular student
adminApp.get('/student/:rollno',expressAsyncHandler(async(req,res)=>{
    let rollno = req.params.rollno;
    let dbStudent = await studentCollection.findOne({rollno:rollno});
    if(dbStudent===null){
        res.send({message:'Student does not exist'})
    }
    else{
        res.send({message:'Student found',payload:dbStudent})
    }
}))

//search for a particular coordinator
adminApp.get('/coord/:rollno',expressAsyncHandler(async(req,res)=>{
    let rollno = req.params.rollno;
    let dbCoordinator = await coordCollection.findOne({rollno:rollno});
    if(dbCoordinator===null){
        res.send({message:'Coordinator does not exist'})
    }
    else{
        res.send({message:'Coordinator found',payload:dbCoordinator})
    }
}))

//add announcement
adminApp.post('/announce',expressAsyncHandler(async(req,res)=>{
    let body = req.body;
    await announcementCollection.insertOne(body);
    res.send({message:'Announcement added'})
}))

//view announcements
adminApp.get('/announce',expressAsyncHandler(async(req,res)=>{
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    let dbAnnouncements = await announcementCollection.find().toArray();
    res.send({message:'Announcements found',payload:dbAnnouncements})
}))

//delete announcement
adminApp.delete('/announce/:id',expressAsyncHandler(async(req,res)=>{
    let id = req.params.id;
    let resp = await announcementCollection.deleteOne({_id:new ObjectId(id)});
    console.log(resp)
    res.send({message:'Announcement deleted'})
}))

//get all students
adminApp.get('/students',expressAsyncHandler(async(req,res)=>{
    let dbStudents = await studentCollection.find({}).toArray();
    res.send({message:'Students found',payload:dbStudents})
}))

//get all coordinators
adminApp.get('/coords',expressAsyncHandler(async(req,res)=>{
    let dbCoordinators = await coordCollection.find().toArray();
    res.send({message:'Coordinators found',payload:dbCoordinators})
}))

//create class
adminApp.post('/class',expressAsyncHandler(async(req,res)=>{
    let body = req.body;
    let result = await classCollection.findOne({classId:body.classId});
    //console.log(result)
    if(result===null){
        await classCollection.insertOne(body);
        res.send({message:'Class created'})
    }
    else{
        res.send({message:'Class already exists'})
    }
    
}))

//forgot password - verify email
adminApp.get('/forgotPassword/:email',expressAsyncHandler(async(req,res)=>{
    let email = req.params.email;
    let dbAdmin = await adminCollection.findOne({email:email});
    if(dbAdmin){
        res.send({message:"User exists", payload:dbAdmin});
    }
    else{
        res.send({message:'Invalid email id'});
    }
}))

//send otp
adminApp.get('/otp/:email',expressAsyncHandler(async(req,res)=>{
    let email = req.params.email;
    let otp = otpGen();
    changePassword(email,otp);
    res.send({message:'OTP sent', payload:otp});
}))

adminApp.put('/forgotPassword/:email',expressAsyncHandler(async(req,res)=>{
    let email = req.params.email;
    let body = req.body;
    let hashedPwd = await bcryptjs.hash(body.password,8);
    let result = await adminCollection.updateOne({email:email},{$set:{password:hashedPwd}});
    let dbAdmin = await adminCollection.findOne({email:email});
    let signedToken = jwt.sign({email: email},process.env.SECRET_KEY);
    res.send({message:"Password reset", token: signedToken, payload: dbAdmin, userType: "admin"});
}))

module.exports = adminApp;