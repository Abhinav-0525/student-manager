import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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


export const userLoginSlice = createSlice({
  name:"user-login-slice",
  initialState:{
    currentUser:{},
    loginStatus:false,
    isPending:false,
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
        state.userType = "";
        state.errorMsg = "";
    }
  },
  extraReducers:builder=>builder
    .addCase(userLoginThunk.pending, (state, action) => {
      state.isPending = true;
  })
    .addCase(userLoginThunk.fulfilled, (state, action) => {
        state.currentUser = action.payload.payload;
        state.loginStatus = true;
        state.isPending = false;
        state.errorOccured = false;
        state.userType = action.meta.arg.userType;
        state.errorMsg = "";
    })
    .addCase(userLoginThunk.rejected, (state, action) => {
        state.currentUser = {};
        state.loginStatus = false;
        state.isPending = false;
        state.errorOccured = true;
        state.errorMsg = action.payload;
    })
})

export const {resetState} = userLoginSlice.actions;

export default userLoginSlice.reducer;   //exporting the root reducers