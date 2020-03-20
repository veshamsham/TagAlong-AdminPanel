  import {
    DESHBOARD,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    ENTERUSERNAME,
    ENTERUSERPASSWORD
    
  } from '../actions/types'
  
  const INITIAL_STATE ={
    userName: '',
    userPassword: '',
    UserData:null,
    loginfailed:null,
    auth:false,
    authentication:false
  }
  export default (state = INITIAL_STATE, action)=>{
    switch(action.type){
      case DESHBOARD:
       // console.log(`Data from the Overview Reducers----> ${action.payload}`)
       // console.log(action.payload);
        return { ...state, userName:action.payload, loginfailed:null}
    
        case LOGIN_USER_SUCCESS:
  
        return { ...state, UserData:action.payload,loginfailed:null,auth:true,authentication:true }

        case LOGIN_USER_FAILED:
          return { ...state, loginfailed:action.payload }
          
          case ENTERUSERNAME:
          return { ...state, userName:action.payload,loginfailed:null }
          case ENTERUSERPASSWORD:
          return { ...state, userPassword:action.payload,loginfailed:null }
      default:
        return state
    }
  }
  
  