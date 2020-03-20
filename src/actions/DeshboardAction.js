/* eslint-disable prettier/prettier */
import history from "./history";
import axios from "axios";
import {
  GET_USER_DOCUMENT_LIST,
  GET_INSPECTION_DETAIL,
  ALLUSERLIST,
  TOTALRIDERS_AND_DRIVERS,
  TRANSACTION_HISTORIESLIST_RIDERS,
  CHANGEUSERSTATUS,
  TRANSACTION_RIDELIST,
  TRANSACTION_SUMMARIES,
  TRANSACTION_HISTORIESLIST,
  MESSAGEDUMP,
  VIEWTHREAD,
  PASSWRONG,
  ALL_RIDELIST,
  ALL_LIVE,
  ALL_CANCELLED,
  ALL_PENDING,
  AUTO_CANCELLED,
  GET_CAR_MODEL,
  ADD_CAR_BRAND,
  ADD_CAR_MODEL,
  DELETE_MODEL,
  ALLPENDINGDRIVERS,
  ALLACTIVITYLOGS,
  GET_RIDES,
  RIDES_DETAILS,
  RIDER_DETAILS
} from "./types";
import api from "../api";
import PostData from "./fatch";
import { toast } from "mdbreact";

export const AllUserList = () => {
  return dispatch => {
    api
      .get("admin/allusers", {})
      .then(function(response) {
        // console.log(response.data)
        if (response.data.status === 1) {
        }
        dispatch({
          type: ALLUSERLIST,
          payload: response.data.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
};

export const AllActivityList = () => {
  return dispatch => {
    api
      .get("admin/all-activity", {})
      .then(function(response) {
        // console.log(response.data)
        if (response.data.status === 1) {
        }
        dispatch({
          type: ALLACTIVITYLOGS,
          payload: response.data.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
};

export const Allpendingdrivers = () => {
  return dispatch => {
    api
      .get("admin/get_pending_drivers", {})
      .then(function(response) {
        // console.log(response.data)
        if (response.data.status === 1) {
        }
        dispatch({
          type: ALLPENDINGDRIVERS,
          payload: response.data.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
};

export const allusertotal = () => {
  return dispatch => {
    api
      .get("admin/allusertotal", {})
      .then(function(response) {
        dispatch({
          type: TOTALRIDERS_AND_DRIVERS,
          payload: response.data.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
};

export const editstatus = data => {
  return dispatch => {
    api
      .post("admin/editstatus", data)
      .then(function(response) {
        dispatch(AllUserList());
      })
      .catch(function(error) {
        console.log(error);
      });
  };
};

// Transaction (rides) listing
export const transaction_ridelist = data => {
  return dispatch => {
    api
      .post("admin/ridehistory", {})
      .then(function(response) {
        dispatch({
          type: TRANSACTION_RIDELIST,
          payload: response.data.data
          //payload: response.data.description
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
};

export const AllTransactionSummaries = data => {
  return dispatch => {
    api
      .get("admin/driver_tf_summary", {})
      .then(function(response) {
        dispatch({
          type: TRANSACTION_SUMMARIES,
          payload: response.data.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
};

// Transaction history page
export const TransactionHistoryis_riders = data => {
  return dispatch => {
    api
      .get("admin/rider_trans_summary")
      .then(function(response) {
        dispatch({
          type: TRANSACTION_HISTORIESLIST_RIDERS,
          payload: response.data.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
};

// Transaction history page
export const TransactionHistoryis = data => {
  return dispatch => {
    api
      .get("admin/driver_trans_summary")
      .then(function(response) {
        dispatch({
          type: TRANSACTION_HISTORIESLIST,
          payload: response.data.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
};

// Messages Dump Data
export const MessagesDumpData = data => {
  return dispatch => {
    PostData("chat/get_all_chat_list", {})
      .then(function(response) {
        //   console.log(response)
        dispatch({
          type: MESSAGEDUMP,
          payload: response.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
};

// Get conversation list between sender and receiver
export const viewThread = data => {
  return dispatch => {
    PostData("chat/conversationlist", data)
      .then(function(response) {
        dispatch({
          type: VIEWTHREAD,
          payload: response.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
};

// Transaction ALL (rides) listing
export const transaction_allrides = data => {
  return dispatch => {
    api
      .post("admin/all_rides", {
        rideType: 1
      })
      .then(function(response) {
        dispatch({
          type: ALL_RIDELIST,
          payload: response.data.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
};

// Transaction ALL (rides) listing
export const allrides_live = data => {
  return dispatch => {
    api
      .post("admin/all_rides", {
        rideType: 1
      })
      .then(function(response) {
        dispatch({
          type: ALL_LIVE,
          payload: response.data.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
};

// Transaction ALL (rides) listing
export const allrides_pending = data => {
  return dispatch => {
    api
      .post("admin/all_rides", {
        rideType: 2
      })
      .then(function(response) {
        dispatch({
          type: ALL_PENDING,
          payload: response.data.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
};

// Transaction ALL (rides) listing
export const allrides_cancelled = data => {
  return dispatch => {
    api
      .post("admin/all_rides", {
        rideType: 3
      })
      .then(function(response) {
        dispatch({
          type: ALL_CANCELLED,
          payload: response.data.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
};

// Transaction ALL (rides) listing
export const allrides_autocancelled = data => {
  return dispatch => {
    api
      .post("admin/all_rides", {
        rideType: 4
      })
      .then(function(response) {
        dispatch({
          type: AUTO_CANCELLED,
          payload: response.data.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
};

// Get all car model list
export const getAllcarModel = data => {
  return dispatch => {
    api
      .get("/admin/get_car_list")
      .then(function(res) {
        dispatch({
          type: GET_CAR_MODEL,
          payload: res.data.carsData
        });
      })
      .catch(function(err) {
        console.log(err);
      });
  };
};

// Add Car Brand
export const addCarBrand = brand => {
  return dispatch => {
    api
      .post("/admin/add_car_brand", brand)
      .then(function(res) {
        console.log(res);
        if (res.data.status == 1) {
          dispatch({
            type: ADD_CAR_BRAND,
            payload: brand.carBrand + " Added"
          });

          dispatch(getAllcarModel());

          toast.success("Record Added successfully !", {
            position: "top-right",
            autoClose: 5000,
            closeButton: true
          });
        } else {
          toast.warn(res.data.message, {
            position: "top-right",
            autoClose: 5000,
            closeButton: true
          });

          dispatch({
            type: ADD_CAR_BRAND,
            payload: "Oops Something went wrong"
          });
        }
      })
      .catch(function(err) {
        dispatch({
          type: ADD_CAR_BRAND,
          payload: "Oops Something went wrong"
        });
      });
  };
};

// Add car model

export const addCarModel = models => {
  return dispatch => {
    api
      .post("admin/add_car_models", models)
      .then(function(res) {
        if (res.data.status == 1) {
          toast.success(res.data.message, {
            position: "top-right",
            autoClose: 5000,
            closeButton: true
          });

          dispatch(getAllcarModel());
        } else {
          toast.warn(res.data.message, {
            position: "top-right",
            autoClose: 5000,
            closeButton: true
          });
          dispatch({
            type: ADD_CAR_MODEL,
            payload: res.data
          });
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  };
};

// Delete model

export const deleteModelAction = (model_id, car_id) => {
  return dispatch => {
    api
      .delete("admin/del_car_model?modelId=" + model_id + "&carId=" + car_id)
      .then(function(res) {
        if (res.data.status == 1) {
          toast.success(res.data.message, {
            position: "top-right",
            autoClose: 5000,
            closeButton: true
          });
          dispatch({
            type: DELETE_MODEL,
            payload: res.data
          });
          dispatch(getAllcarModel());
        } else {
          toast.warn(res.data.message, {
            position: "top-right",
            autoClose: 5000,
            closeButton: true
          });
        }
      })
      .catch(function(err) {
        toast.error("Oops Something went wrong !", {
          position: "top-right",
          autoClose: 5000,
          closeButton: true
        });
      });
  };
};

export const getDocuments = id => {
  // Get all documents of user
  return dispatch => {
    api
      .get(`/admin/get_user_documents/${id}`)
      .then(function(res) {
        dispatch({
          type: GET_USER_DOCUMENT_LIST,
          payload: res.data.documentList
        });
      })
      .catch(function(err) {
        console.log(err);
      });
  };
};

export const getInspectionData = id => {
  // Get all documents of user
  return dispatch => {
    api
      .get(`/admin/get_driver_inspection_details/${id}`)
      .then(function(res) {
        dispatch({
          type: GET_INSPECTION_DETAIL,
          payload: res.data.data
        });
      })
      .catch(function(err) {
        console.log(err);
      });
  };
};

export const inspectionApproveOrReject = data => {
  return dispatch => {
    api
      .post("admin/inspection_approve", data)
      .then(function(response) {
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 5000,
          closeButton: true
        });
        dispatch(getInspectionData(data.id));
      })
      .catch(function(error) {
        console.log(error);
      });
  };
};

export const getRides = data => {
  return dispatch => {
    api
      .get("admin/get-rides/"+data)
      .then(function(response) {
        dispatch({
          type: GET_RIDES,
          payload: response.data.data
        }); 
      })
      .catch(function(error) {
        console.log(error);
      });
  };
};


export const getRidesDetails = (userid,rideid) => {
  return dispatch => {
    api
      .get("admin/driver-ride-details/"+userid+"/"+rideid)
      .then(function(response) {
        dispatch({
          type: RIDES_DETAILS,
          payload: response.data.rideData
        }); 
      })
      .catch(function(error) {
        console.log(error);
      });
  };
};

export const getPassengerDetails = (userid,rideid) => {
  return dispatch => {
    api
      .get("admin/rider-ride-details/"+userid+"/"+rideid)
      .then(function(response) {
        dispatch({
          type: RIDER_DETAILS,
          payload: response.data.rideData
        }); 
      })
      .catch(function(error) {
        console.log(error);
      });
  };
};

