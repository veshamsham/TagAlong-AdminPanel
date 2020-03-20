import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  ListGroup,
  ListGroupItem,
  FormGroup,
  Label,
  Input,
  TabContent, TabPane, Nav, NavItem, NavLink, CardTitle, CardText
} from "reactstrap";
import classnames from 'classnames';
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import {
  getInspectionData,
  inspectionApproveOrReject,
  getPassengerDetails
} from "../../actions/DeshboardAction";
import { MDBDataTable } from "mdbreact";
import Modal from "react-responsive-modal";

class RideDetails extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      ppercase: false,
      openModel: false,
      change_id: "",
      status_value: "",
      btaction: "",
      suspend: "block",
      unsuspend: "none",
      admin_pass: "",
      passwordError: "",
      msgError: "",
      btactionss: "",
      message: "",
      isApprove: "Approve",
      reject_comment: "",
      activeTab:"1"
    };

    
  }

  

  

  toggle = (tab) =>{
      this.setState({activeTab:tab})
  }
  componentDidMount() {
    let id = this.props.location.state ? this.props.location.state[0].id : "";
    if (id) {
      this.props.getPassengerDetails(this.props.location.state[0].id,this.props.location.state[0].rideid);
    } else {
      this.props.history.push("passenger-ride-detail");
    }

    
    
  }

  
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

  userStatusDriver = status => {
    switch (status) {
      case 11:
        return (
          <Button color="warning" size="sm">
            Pending
          </Button>
        );
      case 12:
        return (
          <Button color="success" size="sm">
            Scheduled
          </Button>
        );
      case 13:
        return (
          <Button color="success" size="sm">
            Started
          </Button>
        );
      case 14:
        return (
          <Button color="success" size="sm">
            Completed
          </Button>
        );
      case 15:
        return (
          <Button color="danger" size="sm">
            Cancelled
          </Button>
        );
    }
  };

   imageExists = (url, callback) =>{
    var img = new Image();
    img.onload = function() { callback(true); };
    img.onerror = function() { callback(false); };
    img.src = url;
  }
  
  // Sample usage


  render() {
    const { getinspectiondetails,passengerDetailsData } = this.props;
    

    var results = {};
    var carImages = [];
    if (passengerDetailsData != null) {
      results = passengerDetailsData;
      var rideDateTime = results.rideDateTime;
      var endLocation = results.endLocation;
      var isDrive = results.isDrive;
      var startLocation = results.startLocation;
      var status = results.status;
      var estimatedFare = results.estimatedFare;
      var profile_pic = results.profile_pic;
      var ridersList = results.ridersList;
      var onBoard = results.onBoard;
      var joinRequest = results.joinRequest;
      var payStatus = results.payStatus
      var driverDetails = results.driverDetails;

      var onBoard = results.onBoard.length;

      var driver_rideDateTime = driverDetails.rideDateTime ? driverDetails.rideDateTime:''; 
      var driver_startLocation = driverDetails.startLocation ? driverDetails.startLocation:''; 
      var driver_endLocation = driverDetails.endLocation ? driverDetails.endLocation:''; 
      var driver_userName = driverDetails.userName ? driverDetails.userName:''; 
      var driver_mobileNo = driverDetails.mobileNo ? driverDetails.mobileNo:''; 
      var driver_profile_pic = driverDetails.profile_pic ? driverDetails.profile_pic:'../../assets/img/avatars/6.jpg'; 
      var driver_vehicle = driverDetails.vehicle ? driverDetails.vehicle:''; 
      var driver_vehicleNumber = driverDetails.vehicleNumber ? driverDetails.vehicleNumber:''; 
      var driver_status = driverDetails.status ? driverDetails.status:''; 
      
      console.log('rideDateTime---'+JSON.stringify(driverDetails))
      console.log('rideDateTime---'+JSON.stringify(driverDetails.rideDateTime))
      
     
     
    }
    //userlist table data

    return (
      <div className="animated fadeIn">
        <Row className="mt-4">
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Passenger Details 
                {results.userName ? " for " + results.userName:''}
                
              </CardHeader>
            </Card>
          </Col>
        </Row>
        <Row className="mt-4">
          
          <Col>
          <Card className="cardRadius">
              <CardHeader className="cardHead">Passenger Details</CardHeader>
              <CardBody className="cardBody">


                <form class="form-inline">

                <div class="form-group col-sm-12 mb-3">
                    <label for="inputPassword6" className="col-sm-4 font-weight-bold">Ride Date Time</label>
                    <span class="col-sm-1">:</span>
                    <input type="text" id="inputPassword6" class="form-control mx-sm-3 col-sm-5" value={rideDateTime} aria-describedby="passwordHelpInline" disabled />
                  </div>
                  <div class="form-group col-sm-12 mb-3">
                    <label for="inputPassword6" className="col-sm-4 font-weight-bold">Start Location</label>
                    <span class="col-sm-1">:</span>
                    <input type="text" id="inputPassword6" class="form-control mx-sm-3 col-sm-5" value={startLocation} aria-describedby="passwordHelpInline" disabled />
                    
                  </div>
                  <div class="form-group col-sm-12 mb-3">
                    <label for="inputPassword6" className="col-sm-4 font-weight-bold">End Location</label>
                    <span class="col-sm-1">:</span>
                    <input type="text" id="inputPassword6" class="form-control mx-sm-3 col-sm-5" value={endLocation} aria-describedby="passwordHelpInline" disabled />
                  </div>
                  <div class="form-group col-sm-12 mb-3">
                    <label for="inputPassword6" className="col-sm-4 font-weight-bold">Estimated Fare</label>
                    <span class="col-sm-1">:</span>
                    <input type="text" id="inputPassword6" class="form-control mx-sm-3 col-sm-5" value={estimatedFare} aria-describedby="passwordHelpInline" disabled />
                  </div>

                  <div class="form-group col-sm-12 mb-3">
                    <label for="inputPassword6" className="col-sm-4 font-weight-bold">Status</label>
                    <span class="col-sm-1">:</span>
                    <span  class="mx-sm-3 col-sm-5">{this.userStatus(status)}</span>
                  </div>

                </form>
              </CardBody>
            </Card>
          </Col>

          
        </Row>

        <Row className="mt-4">
          <Col>
          <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: this.state.activeTab === '1' })}
            onClick={() => { this.toggle('1'); }}
          >
            <span style={{color:'#398439'}}>Driver Details</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: this.state.activeTab === '2' })}
            onClick={() => { this.toggle('2'); }}
          >
            <span style={{color:'#2e6da4'}}>Another Rides</span>
            
          </NavLink>
        </NavItem>

        {/* <NavItem>
          <NavLink
            className={classnames({ active: this.state.activeTab === '3' })}
            onClick={() => { this.toggle('3'); }}
          >
            <span style={{color:'#ac2925'}}>Join Request</span>
            
          </NavLink>
        </NavItem> */}
      </Nav>
      <TabContent activeTab={this.state.activeTab}>
        <TabPane tabId="1">
        
        <Row className="mt-4">
              <Col>
              <Card className="cardRadius">
              <CardHeader className="cardHead" style={{color:'#398439'}}>Driver Details</CardHeader>
              <CardBody className="cardBody">
                <form class="form-inline">
                  

                  <div class="form-group col-sm-12 mb-3">
                    <label className="col-sm-3 text-left d-block font-weight-bold" for="inputPassword6">User Name</label>
                    <span className="d-block float-left col-sm-1 font-weight-bold">:</span>
                    <input type="text" id="inputPassword6" class="form-control mx-sm-3 col-sm-6" value={driver_userName}  aria-describedby="passwordHelpInline" disabled />
                  </div>


                  <div class="form-group col-sm-12 mb-3">
                    <label className="col-sm-3 text-left d-block font-weight-bold" for="inputPassword6">Mobile No</label>
                    <span className="d-block float-left col-sm-1 font-weight-bold">:</span>
                    <input type="text" id="inputPassword6" class="form-control mx-sm-3 col-sm-6" value={driver_mobileNo}  aria-describedby="passwordHelpInline" disabled />
                  </div>

                  <div class="form-group col-sm-12 mb-3">
                    <label className="col-sm-3 text-left d-block font-weight-bold" for="inputPassword6">Vehicle</label>
                    <span className="d-block float-left col-sm-1 font-weight-bold">:</span>
                    <input type="text" id="inputPassword6" class="form-control mx-sm-3 col-sm-6" value={driver_vehicle}  aria-describedby="passwordHelpInline" disabled />
                  </div>

                  <div class="form-group col-sm-12 mb-3">
                    <label className="col-sm-3 text-left d-block font-weight-bold" for="inputPassword6">Vehicle No.</label>
                    <span className="d-block float-left col-sm-1 font-weight-bold">:</span>
                    <input type="text" id="inputPassword6" class="form-control mx-sm-3 col-sm-6" value={driver_vehicleNumber}  aria-describedby="passwordHelpInline" disabled />
                  </div>

                  <div class="form-group col-sm-12 mb-3">
                    <label className="col-sm-3 text-left d-block font-weight-bold" for="inputPassword6">Profile Picture</label>
                    <span className="d-block float-left col-sm-1 font-weight-bold">:</span>
                    {/* <img className="img-fluid rounded-circle" src={driver_profile_pic} alt="Profile_pic" onerror={(e)=>{ if (e.target.src !== driver_profile_pic){
                 e.target.src="../../assets/img/avatars/6.jpg";}
               }} width="100" height="100"/> */}

<img className="img-fluid rounded-circle" src={driver_profile_pic} alt="Profile_pic" onError={(e) => {
     e.target.src = '../../assets/img/avatars/6.jpg' // some replacement image
     e.target.style = 'padding: 8px; margin: 16px' // inline styles in html format
  }} width="100" height="100"/> 
               
                    {/* { this.imageExists(driver_profile_pic, function(exists) {
                 console.log('RESULT: url=' + driver_profile_pic + ', exists=' + exists);
                 if(exists) {
                  console.log('RESULT: url=' + driver_profile_pic + ', if=' + exists);
                   
                 } else {
                     console.log('RESULT: url=' + driver_profile_pic + ', else=' + exists);
                 }
    })} */}
                    
                  </div>
                 
                </form>
              </CardBody>
              </Card>
              </Col>
              <Col>
              <Card className="cardRadius">
              <CardHeader className="cardHead" style={{color:'#398439'}}></CardHeader>
              <CardBody className="cardBody">

                <form class="form-inline">

              

                <div class="form-group col-sm-12 mb-3">
                    <label className="col-sm-3 text-left d-block font-weight-bold" for="inputPassword6">Ride Date Time</label>
                    <span className="d-block float-left col-sm-1 font-weight-bold">:</span>
                    <input type="text" id="inputPassword6" class="form-control mx-sm-3 col-sm-6" value={driver_rideDateTime}  aria-describedby="passwordHelpInline" disabled />
                  </div>
                  <div class="form-group col-sm-12 mb-3">
                    <label className="col-sm-3 text-left d-block font-weight-bold" for="inputPassword6">Start Location</label>
                    <span className="d-block float-left col-sm-1 font-weight-bold">:</span>
                    <input type="text" id="inputPassword6" class="form-control mx-sm-3 col-sm-6" value={driver_startLocation} aria-describedby="passwordHelpInline" disabled />
                  </div>
                  <div class="form-group col-sm-12 mb-3">
                    <label className="col-sm-3 text-left d-block font-weight-bold" for="inputPassword6">End Location</label>
                    <span className="d-block float-left col-sm-1 font-weight-bold">:</span>
                    <input type="text" id="inputPassword6" class="form-control mx-sm-3 col-sm-6" value={driver_endLocation} aria-describedby="passwordHelpInline" disabled />
                  </div>
                  
                  <div class="form-group col-sm-12 mb-3">
                    <label className="col-sm-3 text-left d-block font-weight-bold" for="inputPassword6">Status</label>
                    <span className="d-block float-left col-sm-1 font-weight-bold">:</span>
                   <span className="col-sm-6">{this.userStatusDriver(driver_status)}</span> 
                  </div>

                  

                

                </form>
              </CardBody>
              </Card>
              </Col>
              
              </Row>
        </TabPane>
        <TabPane tabId="2">
          
          <Card className="cardRadius">
              <CardHeader className="cardHead" style={{color:'#2e6da4'}}>OnBoard List</CardHeader>
              <Table>
                <thead>
                  <tr>
                    
                    <th>UserName</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Ride Date & Time</th>
                    <th>Start Location</th>
                    <th>End Location</th>
                    <th>No. of seat</th>
                    <th>Estimated Fare</th>
                    <th>Pay Status</th>
                  </tr>
                </thead>
                <tbody>

                  {onBoard  ? 
                    onBoard.map((data,index)=>{
                      return (<tr>
                        <td>{data.userName}</td>
                        <td>{data.email}</td>
                        <td>{data.mobileNo}</td>
                        <td>{data.rideDateTime}</td>
                        <td>{data.startLocation}</td>
                        <td>{data.endLocation}</td>
                        <td>{data.noOfSeats}</td>
                        <td>{data.estimatedFare}</td>
                        <td>{data.payStatus}</td>
                      </tr>)
                    })
                  :<tr><td>No Record Found.</td></tr>}
                </tbody>
              </Table>
            </Card>
          
        </TabPane>
        <TabPane tabId="3">
        
          <Card className="cardRadius">
              <CardHeader className="cardHead" style={{color:'#ac2925'}}>Join Request</CardHeader>
              <Table>
                <thead>
                  <tr>
                    
                    <th>UserName</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Ride Date & Time</th>
                    <th>Start Location</th>
                    <th>End Location</th>
                    <th>No. of seat</th>
                    <th>Estimated Fare</th>
                    <th>Pay Status</th>
                  </tr>
                </thead>
                <tbody>

                  {joinRequest ? 
                    joinRequest.map((data,index)=>{
                      return (<tr>
                        <td>{data.userName}</td>
                        <td>{data.email}</td>
                        <td>{data.mobileNo}</td>
                        <td>{data.rideDateTime}</td>
                        <td>{data.startLocation}</td>
                        <td>{data.endLocation}</td>
                        <td>{data.noOfSeats}</td>
                        <td>{data.estimatedFare}</td>
                        <td>{data.payStatus}</td>
                      </tr>)
                    })
                  :<tr><td>No Record Found.</td></tr>}
                </tbody>
              </Table>
            </Card>
         
        </TabPane>
      </TabContent>
    </div>
          </Col>
        </Row>
      
        
      </div>
    );
  }
}

const mapStateToProps = ({ alluserlist }) => {
  const { getinspectiondetails,passengerDetailsData, userstatus } = alluserlist;
  return { getinspectiondetails,passengerDetailsData, userstatus };
};
export default withRouter(
  connect(mapStateToProps, { inspectionApproveOrReject,getPassengerDetails })(
    RideDetails
  )
);
