import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import axios from "axios";


export const userLoginThunk = createAsyncThunk('user-login-thunk', async (userObj, thunkApi) => {
    try{
        if(userObj.userType === "student"){
            let res = await axios.post("http://localhost:4000/student-api/login", userObj)
            if(res.data.message === "Login success"){
                localStorage.setItem("token", res.data.token)
            }
            else{
                return thunkApi.rejectWithValue(res.data.message)
            }
            return res.data
        }
    
        if(userObj.userType === "coord"){
            let res = await axios.post("http://localhost:4000/coord-api/login", userObj)
            if(res.data.message === "Login success"){
                localStorage.setItem("token", res.data.token)
            }
            else{
                return thunkApi.rejectWithValue(res.data.message)
            }
            return res.data
        }
    
        if(userObj.userType === "admin"){
            let res = await axios.post("http://localhost:4000/admin-api/login", userObj)
            if(res.data.message === "Login success"){
                localStorage.setItem("token", res.data.token)
            }
            else{
                return thunkApi.rejectWithValue(res.data.message)
            }
            return res.data
        }

    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const userPasswordResetThunk = createAsyncThunk('user-password-reset-thunk', async (userObj, thunkApi) => {
    try{
        if(userObj.userType === "student"){
            let res = await axios.put(`http://localhost:4000/student-api/forgotPassword/${userObj.email}`, {password:userObj.password});
            if(res.data.message === "Password reset"){
                localStorage.setItem("token", res.data.token)
                console.log(res)
            }
            else{
                return thunkApi.rejectWithValue(res.data.message)
            }
            return res.data
        }
        
        if(userObj.userType === "coord"){
            let res = await axios.put(`http://localhost:4000/coord-api/forgotPassword/${userObj.email}`, {password:userObj.password});
            if(res.data.message === "Password reset"){
                localStorage.setItem("token", res.data.token)
            }
            else{
                return thunkApi.rejectWithValue(res.data.message)
            }
            return res.data
        }

        if(userObj.userType === "admin"){
            let res = await axios.put(`http://localhost:4000/admin-api/forgotPassword/${userObj.email}`, {password:userObj.password});
            if(res.data.message === "Password reset"){
                localStorage.setItem("token", res.data.token)
            }
            else{
                return thunkApi.rejectWithValue(res.data.message)
            }
            return res.data
        }
    }
    catch(err){
        return thunkApi.rejectWithValue(err)
    }
})


export const userLoginSlice = createSlice({
  name:"user-login-slice",
  initialState:{
    currentUser:{},
    loginStatus:false,
    isPending:false,
    snackBar:{
        open:false,
        message:""
    },
    errorOccured:false,
    userType:"",
    errorMsg:""
  },
  reducers:{
    resetState: (state, action) => {
        state.currentUser = {};
        state.loginStatus = false;
        state.isPending = false;
        state.errorOccured = false;
        state.snackBar.open = false;
        state.userType = "";
        state.errorMsg = "";
    },
    closeSnackBar: (state, action) => {
        state.snackBar.open = false;
    }
  },
  extraReducers:builder=>builder
    .addMatcher(isAnyOf(userLoginThunk.pending,userPasswordResetThunk.pending), (state, action) => {
      state.isPending = true;
    })
    .addMatcher(isAnyOf(userLoginThunk.fulfilled, userPasswordResetThunk.fulfilled), (state, action) => {
        state.currentUser = action.payload.payload;
        state.loginStatus = true;
        state.isPending = false;
        state.snackBar = {open:true, message:"Login successful!"};
        state.errorOccured = false;
        state.userType = action.meta.arg?.userType ||action.payload.userType ;
        state.errorMsg = "";
    })
    .addMatcher(isAnyOf(userLoginThunk.rejected, userPasswordResetThunk.rejected), (state, action) => {
        state.currentUser = {};
        state.loginStatus = false;
        state.isPending = false;
        state.snackBar = {open:true, message:"Invalid username or password!"};
        state.errorOccured = true;
        state.errorMsg = action.payload;
    })
})

export const {resetState, closeSnackBar} = userLoginSlice.actions;

export default userLoginSlice.reducer;   //exporting the root reducers