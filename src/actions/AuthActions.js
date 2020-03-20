import history from "./history";
import React,{useContext} from 'react'

import axios from "axios";
import {
  DESHBOARD,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  ENTERUSERNAME,
  ENTERUSERPASSWORD
} from "./types";
import PostData from "./fatch";



export const Signin = data => {
  return dispatch => {
    PostData("admin/signin", data)
      .then(function(response) {
        // console.log(response.data);
        if (response.status === 1) {
          localStorage.setItem("token", response.token);
          localStorage.setItem("userType", response.data.type);
          localStorage.setItem("loggedInUserId", response.data._id);
          localStorage.setItem("userData", JSON.stringify(response.data));
          if (response.data.type === 4) history.push("/approvallist");
          // Checking customer service login
          else history.push("/dashboard");
          dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: response.data
          });
        } else {
          dispatch({
            type: LOGIN_USER_FAILED,
            payload: "Invalid User Credentials Details !"
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };
};

export const userNamess = userName => {
  return dispatch => {
    dispatch({
      type: ENTERUSERNAME,
      payload: userName
    });
  };
};

export const userpass = userPassword => {
  return dispatch => {
    dispatch({
      type: ENTERUSERPASSWORD,
      payload: userPassword
    });
  };
};
