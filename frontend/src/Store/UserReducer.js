const { createReducer } = require("@reduxjs/toolkit");

let state={
    user:{},
    isLoggedIn:false,
    userType:false,
    token:"",
}

const userReducer=createReducer(state=state,{
    setuser:(state,action)=>{
        state.user=action.payload
    },
    setIsLoggedIn:(state,action)=>{
        state.isLoggedIn=true
    },
    setUserType:(state,action)=>{
        state.userType=action.payload
    },
    setToken:(state,action)=>{
        state.token=action.payload.token
    },
    setLogout:(state,action)=>{
        state.isAdmin=false
        state.isLoggedIn=false
    }
})
export default userReducer;