/* eslint-disable prettier/prettier */
import {
  ALLUSERLIST,
  TOTALRIDERS_AND_DRIVERS,
  CHANGEUSERSTATUS,
  TRANSACTION_RIDELIST,
  TRANSACTION_SUMMARIES,
  TRANSACTION_HISTORIESLIST,
  MESSAGEDUMP,
  VIEWTHREAD,
  PASSWRONG,
  TRANSACTION_HISTORIESLIST_RIDERS,
  ALL_RIDELIST,
  ALL_CANCELLED,
  ALL_LIVE,
  ALL_PENDING,
  AUTO_CANCELLED,
  GET_CAR_MODEL,
  ADD_CAR_BRAND,
  ADD_CAR_MODEL,
  DELETE_MODEL,
  GET_USER_DOCUMENT_LIST,
  ALLPENDINGDRIVERS,
  GET_INSPECTION_DETAIL,
  ALLACTIVITYLOGS,
  GET_RIDES,
  RIDES_DETAILS,
  RIDER_DETAILS
} from "../actions/types";

const INITIAL_STATE = {
  userName: null,
  userlist: null,
  totalusers: null,
  transaction_ridelists: null,
  transaction_summary: null,
  transaction_histories: null,
  messagedumprecord: null,
  viewthreadrecord: null,
  userstatus: null,
  transaction_histories_riders: null,
  allrides: null,
  allLive: null,
  allCancelled: null,
  allPending: null,
  autoCancelled: null,
  getCarModel: null,
  addbrand: null,
  addModel: null,
  deletModel: null,
  getUserDocumentList: null,
  getpendingdrivers: null,
  getinspectiondetails: null,
  activity_list:null,
  activity_status:null,
  getRidesData:null,
  rideDetailsData:null,
  passengerDetailsData:null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ALLUSERLIST:
      return {
        ...state,
        userlist: action.payload,
        userstatus: action.userstatus
      };

      case ALLACTIVITYLOGS:
        return {
          ...state,
          activity_list: action.payload,
          activity_status: action.userstatus
        };

    case TOTALRIDERS_AND_DRIVERS:
      return { ...state, totalusers: action.payload };

    case CHANGEUSERSTATUS:
      return { ...state, totalusers: action.payload };
    //transaction ride listing
    case TRANSACTION_RIDELIST:
      return { ...state, transaction_ridelists: action.payload };
    //ALL rides transaction ride listing
    case ALL_RIDELIST:
      return { ...state, allrides: action.payload };
    // Transaction Summary page
    case TRANSACTION_SUMMARIES:
      return { ...state, transaction_summary: action.payload };
    // Transaction history page
    case TRANSACTION_HISTORIESLIST:
      return { ...state, transaction_histories: action.payload };

    // Transaction history page
    case MESSAGEDUMP:
      return { ...state, messagedumprecord: action.payload };

    case VIEWTHREAD:
      return { ...state, viewthreadrecord: action.payload };

    case PASSWRONG:
      return { ...state, userstatus: action.userstatus };

    case TRANSACTION_HISTORIESLIST_RIDERS:
      return { ...state, transaction_histories_riders: action.payload };

    case ALL_LIVE:
      return { ...state, allLive: action.payload };

    case ALL_PENDING:
      return { ...state, allPending: action.payload };

    case ALL_CANCELLED:
      return { ...state, allCancelled: action.payload };

    case AUTO_CANCELLED:
      return { ...state, autoCancelled: action.payload };

    case GET_CAR_MODEL:
      return { ...state, getCarModel: action.payload };

    case ADD_CAR_BRAND:
      return { ...state, addbrand: action.payload };

    case ADD_CAR_MODEL:
      return { ...state, addModel: action.payload };

    case DELETE_MODEL:
      return { ...state, deletModel: action.payload };

    case GET_USER_DOCUMENT_LIST:
      return { ...state, getUserDocumentList: action.payload };

    case ALLPENDINGDRIVERS:
      return { ...state, getpendingdrivers: action.payload };

    case GET_INSPECTION_DETAIL:
      return { ...state, getinspectiondetails: action.payload };

    case GET_RIDES:
      return { ...state, getRidesData: action.payload };

    case RIDES_DETAILS:
      return { ...state, rideDetailsData: action.payload };

      case RIDER_DETAILS:
      return { ...state, passengerDetailsData: action.payload };
      

    default:
      return state;
  }
};
