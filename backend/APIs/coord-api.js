const exp = require('express');
const coordApp = exp.Router();
const expressAsyncHandler = require('express-async-handler');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {ObjectId} = require('mongodb');
const { otpGen } = require('../PasswordGen');
const { changePassword } = require('../EmailSender');
require('dotenv').config();

//Get coordinator details
let coordCollection;
coordApp.use((req, res, next) => {
    coordCollection = req.app.get('coordCollection');
    studentCollection = req.app.get('studentCollection');
    announcementCollection = req.app.get('announcementCollection');
    assignmentCollection = req.app.get('assignmentCollection');
    next();
})

//coordinator login
coordApp.post('/login',expressAsyncHandler(async(req,res)=>{
    let coord = req.body;
    let dbCoord = await coordCollection.findOne({email:coord.email});
    if(dbCoord===null){
        res.send({message:"Invalid email"})
    }
    else{
        let status = await bcryptjs.compare(coord.password,dbCoord.password);
        if(status===false){
            res.send({message:"Invalid password"});
        }
        else{
            let signedToken = jwt.sign({email:coord.email},process.env.SECRET_KEY);
            res.send({message:"Login success",token:signedToken, payload:dbCoord});
        }
    }
}))


//modify coord details
coordApp.put('/update',expressAsyncHandler(async(req,res)=>{
    let newCoord = req.body;
    let oldCoord = await coordCollection.findOne({email:newCoord.email});
    newCoord.password = oldCoord.password;
    let result = await coordCollection.updateOne({email: newCoord.email}, {$set: newCoord});
    console.log(result);
    res.send({message: "Coordinator details updated"});
}))

//add announcement
coordApp.post('/announce',expressAsyncHandler(async(req,res)=>{
    let body = req.body;
    await announcementCollection.insertOne(body);
    res.send({message:'Announcement added'})
}))

//view announcements
coordApp.get('/announce',expressAsyncHandler(async(req,res)=>{
    let dbAnnouncements = await announcementCollection.find({}).toArray();
    res.send({message:'Announcements found',payload:dbAnnouncements})
}))

//create assignment
coordApp.post('/assignment',expressAsyncHandler(async(req,res)=>{
    let body = req.body;
    await assignmentCollection.insertOne(body);
    res.send({message:'Assignment added'})
}))

//get assignments
coordApp.get('/assignment/:classId',expressAsyncHandler(async(req,res)=>{
    let classId = req.params.classId;
    let dbAssignments = await assignmentCollection.find({classId:classId}).toArray();
    res.send({message:'Assignments found',payload:dbAssignments})
}))

//get submissions
coordApp.get('/assignment/submissions/:id', expressAsyncHandler(async(req,res)=>{
    let id = req.params.id;
    let dbAssignment = await assignmentCollection.findOne({_id:new ObjectId(id)});
    res.send({message:'Submissions found',payload:dbAssignment.submissions});
}))

//delete assignment
coordApp.delete('/assignment/:id',expressAsyncHandler(async(req,res)=>{
    let id = req.params.id;
    await assignmentCollection.deleteOne({_id:new ObjectId(id)});
    res.send({message:'Assignment deleted'})
}))

//get students list
coordApp.get('/students/:classId',expressAsyncHandler(async(req,res)=>{
    let id = req.params.classId;
    let dbStudents = await studentCollection.find({classId:id}).toArray();
    res.send({message:'Students found',payload:dbStudents})
}))

//change password
coordApp.put('/changePassword',expressAsyncHandler(async(req,res)=>{
    let body = req.body;
    let dbCoord = await coordCollection.findOne({email:body.email});
    let status = await bcryptjs.compare(body.oldPassword,dbCoord.password);
    if(status){
        let newPassword = await bcryptjs.hash(body.newPassword1,8);
        let result = await coordCollection.updateOne({email:body.email},{$set:{password:newPassword}});
        res.send({message:'Password changed'});
    }
    else{
        res.send({message:'Wrong old password'});
    }
}))

//update profile picture
coordApp.put('/profile-photo',expressAsyncHandler(async(req,res)=>{
    let newCoord = req.body;
    let result = await coordCollection.updateOne({email:newCoord.email},{$set:{profilePhoto:newCoord.profilePhoto, hasPhoto:true}});
    res.send({message:'Profile photo updated'});
}))

//forgot password - verify email
coordApp.get('/forgotPassword/:email',expressAsyncHandler(async(req,res)=>{
    let email = req.params.email;
    let dbCoord = await coordCollection.findOne({email:email});
    if(dbCoord){
        res.send({message:"User exists", payload:dbCoord});
    }
    else{
        res.send({message:'Invalid email id'});
    }
}))

//send otp
coordApp.get('/otp/:email',expressAsyncHandler(async(req,res)=>{
    let email = req.params.email;
    let otp = otpGen();
    changePassword(email,otp);
    res.send({message:'OTP sent', payload:otp});
}))

//change password and create token
coordApp.put('/forgotPassword/:email',expressAsyncHandler(async(req,res)=>{
    let email = req.params.email;
    let body = req.body;
    let hashedPwd = await bcryptjs.hash(body.password,8);
    let result = await coordCollection.updateOne({email:email},{$set:{password:hashedPwd}});
    let dbCoord = await coordCollection.findOne({email:email});
    let signedToken = jwt.sign({email: email},process.env.SECRET_KEY);
    res.send({message:"Password reset", token: signedToken, payload: dbCoord, userType: "coord"});
}))


module.exports = coordApp;
