import React, { Component } from "react";
import { Button, Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import {
  AllActivityList,
  allusertotal,
  editstatus
} from "../../actions/DeshboardAction";
import { MDBDataTable } from "mdbreact";
import moment from 'moment'
import Modal from "react-responsive-modal";
import Spinner from "../../Loader"

class ActivityLog extends Component {
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
          label: "Mobile Number",
          field: "mobileNo",
          sort: "asc"
          // width: 200
        },
        {
          label: "Email id",
          field: "email",
          sort: "asc"
          // width: 100
        },
        // {
        //   label: "Address",
        //   field: "address",
        //   sort: "asc"
        //   // width: 150
        // },
        
       
        
        {
          label: "Action By & Date",
          field: "action_by",
          sort: "asc"
          // width: 150
        },
        {
          label: "Inspection By & Date",
          field: "inspection_by",
          sort: "asc"
          // width: 150
        },
        {
          label: "Status",
          field: "status",
          sort: "asc"
          // width: 150
        },
        {
          label: "Action",
          field: "document",
          sort: "asc"
          // width: 150
        },
        // {
        //   label: "Status",
        //   field: "status",
        //   sort: "asc"
        //   // width: 150
        // },
        // {
        //   label: "Status",
        //   field: "status",
        //   sort: "asc"
        //   // width: 150
        // }
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

  userstatuss = status => {
    switch (status) {
      case 1:
        return (
          <Button color="warning" size="sm">
            Inspected
          </Button>
        );
      case 2:
        return (
          <Button color="success" size="sm">
            Approved
          </Button>
        );
      case 3:
        return (
          <Button color="danger" size="sm">
            Rejected
          </Button>
        );
      default:
        return (
          <Button color="warning" size="sm">
            Pending
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
    const { activity_list, totalusers } = this.props;


    const results = [];
    if (activity_list != null) {
      activity_list.map((data, index) =>
        results.push({
          userName: data.userName,
          mobileNo: data.mobileNo,
          email: data.email,
         
          action_by: (
            data.actionBy ? data.actionBy.userName+' - '+moment(data.actionDate).format('ddd, MMM Do YYYY, h:mm a')  :''   
          ),
          inspection_by: (
            data.inspectionBy ? data.inspectionBy.userName+' - '+moment(data.inspectionDate).format('ddd, MMM Do YYYY, h:mm a') :''
          ),
          status: this.userstatuss(data.approvalStatus),
          documents: (
            
            <Link
            to={{
              pathname: "/user-detail",
              state: [{ id: data._id }]
            }}
          >
            View Details
          </Link>
          ),
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
            {/* <Card className="text-white bg-brown mb-2">
              <CardBody className="">
                <div>
                  <h5
                    style={{ color: "#ffff", float: "left" }}
                    href=""
                    target="blank"
                  >
                    Total Users
                  </h5>
                  
                  <h5 style={{ float: "right" }}>10</h5>
                </div>
              </CardBody>
            </Card> */}
          </Col>

          {/* <Col xs="12" sm="6" lg="6">
            <Card className="text-white bg-brown mb-2">
              <CardBody className="">
               
                <div><h5 style={{color:'#ffff',float:'left'}} href="" target="blank">New Users</h5>
                <h5 className="user-no">10</h5>
                </div>
              </CardBody>
           
            </Card>
          </Col> */}
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
                <i className="fa fa-align-justify"></i> All users
              </CardHeader>

              <CardBody className="dtbFooterhide cardMinHeight">
              
              
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
  const { activity_list, totalusers, activity_status } = alluserlist;
  return { activity_list, totalusers, activity_status };
};
export default withRouter(
  connect(mapStateToProps, { AllActivityList, allusertotal, editstatus })(
    ActivityLog
  )
);
