import React, { Component } from "react";
import { Button, Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import {
  AllActivityList,
  allusertotal,
  editstatus,
  getRides
} from "../../actions/DeshboardAction";
import { MDBDataTable } from "mdbreact";
import moment from 'moment'
import Modal from "react-responsive-modal";
import Spinner from "../../Loader"

class PassengersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      columnsdata: [
        {
          label: "User",
          field: "userName",
          sort: "asc"
          // width: 150
        },
        {
          label: "Email id",
          field: "email",
          sort: "asc"
          // width: 200
        },
        {
          label: "Ride Type",
          field: "isRideShort",
          sort: "asc"
          // width: 100
        },
        
       
        {
          label: "Start Location",
          field: "startLocation",
          sort: "asc"
          // width: 150
        },
        {
          label: "End Location",
          field: "endLocation",
          sort: "asc"
          // width: 150
        },
        {
          label: "No. of Seats",
          field: "noOfSeats",
          sort: "asc"
          // width: 150
        },
        {
          label: "Payment Method",
          field: "payMethod",
          sort: "asc"
          // width: 150
        },
        {
          label: "Distance between",
          field: "distBtwSrcDest",
          sort: "asc"
          // width: 150
        },
        {
          label: "Estimated Fare",
          field: "estimatedFare",
          sort: "asc"
          // width: 150
        },
        
        {
          label: "Ride Date & time",
          field: "rideDateTime",
          sort: "asc"
          // width: 150
        },
         
        {
          label: "Status",
          field: "status",
          sort: "asc"
        },
        {
          label: "Action",
          field: "action",
          sort: "asc"
          // width: 150
        },
        
        
      ],
      ppercase: false,
      open: false,
      change_id: "",
      status_value: "",
      btaction: "",
      suspend: "block",
      unsuspend: "none",
      admin_pass: "",
      passwordError: "",
      msgError: "",
      btactionss: "",
      message: ""
    };
    this.toggleInputCase = this.toggleInputCase.bind(this);
    //console.log("userdddddddddddddddddd" + localStorage.getItem("userType"));
    // Checking for Customer service login
    if (localStorage.getItem("userType") === "4") {
      console.log("inside approval");

      this.props.history.push("approvallist");
    }
  }
  componentDidMount() {
    this.props.AllActivityList();
    this.props.allusertotal();
    this.props.getRides(false)
  }

  handleChange = event => {
    console.log(event.target.value);
    this.setState({ value: event.target.value });
  };

  toggleInputCase = (value, id) => {
    this.setState({ open: true, change_id: id, status_value: value });
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  changestatus_save = () => {
    const dataTosend = {
      id: this.state.change_id,
      status: this.state.status_value
    };
    this.props.editstatus(dataTosend);

    this.setState({ open: false, change_id: "", status_value: "" });
  };

  //  Send Text/Message to All Users Popup

  msgPopup = act => {
    // console.log(act)
    this.setState({
      modal1: !this.state.modal1,
      msgError: ""
    });
  };

  // Send Text/Message to All Users Popup End

  toggle = act => {
    //console.log(act)

    this.setState({
      modal: !this.state.modal,
      btactionss: act,
      passwordError: ""
    });
  };

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

 

  userStatus = status => {
    switch (status) {
      case 1:
        return (
          <Button color="warning" size="sm">
            Pending
          </Button>
        );
      case 2:
        return (
          <Button color="warning" size="sm">
            Requested
          </Button>
        );
      case 3:
        return (
          <Button color="success" size="sm">
            Scheduled
          </Button>
        );
      case 4:
        return (
          <Button color="success" size="sm">
            Picked up
          </Button>
        );
      case 5:
        return (
          <Button color="success" size="sm">
            Completed
          </Button>
        );
      case 6:
        return (
          <Button color="danger" size="sm">
             Cancelled
          </Button>
        );
      case 7:
        return (
          <Button color="danger" size="sm">
            Cancelled
          </Button>
        );
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.activity_status !== this.props.activity_status) {
      if (nextProps.activity_status === 1) {
        this.setState({ suspend: "none", unsuspend: "block" });
      }

      if (nextProps.activity_status === 2) {
        this.setState({ unsuspend: "none", suspend: "block" });
      }
    }
  }

  render() {
    const { open } = this.state;
    const { getRidesData, totalusers } = this.props;

    // console.log(totalusers);

    const results = [];
    if (getRidesData != null) {
      getRidesData.map((data, index) =>
        results.push({
          userName: data.userId.userName,
          email: data.userId.email,
          isRideShort: data.isRideShort ? 'Quick ride':'Long ride',
          startLocation: data.startLocation,
          endLocation: data.endLocation,
          noOfSeats: data.noOfSeats,
          payMethod: data.payMethod,
          distBtwSrcDest: data.distBtwSrcDest+' miles',
          estimatedFare: data.estimatedFare,
          rideDateTime: data.rideDateTime,
          status: this.userStatus(data.status),
          action: (<Link
            to={{
              pathname: "/passenger-ride-detail",
              state: [{ id: data.userId._id,rideid:data._id }]
            }}
          >
            View Details
          </Link>),
        })
      );
    }

    //userlist table data
    const data = {
      columns: this.state.columnsdata,
      rows: results
    };

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12" lg="12">
           
          </Col>

         
        </Row>

        <Row className="mt-4">
          <Modal open={open} onClose={this.onCloseModal} center>
            <Row className="align-items-center"></Row>
            <br />
            <br />
            <div className="align-items-center">
              <h3>Are sure want change the user status?</h3>
              <br />
              <Row className="align-items-center"></Row>
            </div>
            <Row className="align-items-center">
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block onClick={this.changestatus_save} color="primary">
                  Save
                </Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button block onClick={this.onCloseModal} color="danger">
                  Cancel
                </Button>
              </Col>
            </Row>
          </Modal>

          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Passenger Rides List
              </CardHeader>

              <CardBody className="dtbFooterhide ">
                {/* <MDBDataTable
                  striped
                  bordered
                  entries={20}
                  entriesOptions={[20, 30, 50]}
                  data={data}
                /> */}
                {data.rows.length>0 ?  <MDBDataTable
                  striped
                  bordered
                  entries={20}
                  entriesOptions={[20, 30, 50]}
                  data={data}
                />:<Spinner animation="grow" />}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ alluserlist }) => {
  const { activity_list, totalusers, activity_status,getRidesData } = alluserlist;
  return { activity_list, totalusers, activity_status,getRidesData };
};
export default withRouter(
  connect(mapStateToProps, { AllActivityList, allusertotal, editstatus, getRides })(
    PassengersList
  )
);
