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
  getRidesDetails
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
      this.props.getInspectionData(id);
      this.props.getRidesDetails(this.props.location.state[0].id,this.props.location.state[0].rideid);
    } else {
      this.props.history.push("driver-ride-list");
    }

    
    
  }

  onOpenModal = buttonVal => {
    let isApprove = buttonVal ? "Approve" : "Reject";
    this.setState({ ...this.state, openModel: true, isApprove: isApprove });
  };

  onCloseModal = () => {
    this.setState({ ...this.state, openModel: false });
  };

  changestatus_save = (driverId, status) => {
    
    const dataTosend = {
      id: driverId,
      status: status,
      loggedInUserId: localStorage.getItem("loggedInUserId"),
      reject_comment: this.state.reject_comment
    };
    this.props.inspectionApproveOrReject(dataTosend);

    this.setState({
      ...this.state,
      openModel: false,
      change_id: "",
      status_value: ""
    });
  };

  carImgSide = val => {
    switch (val) {
      case 1:
        return "Front side";
      case 2:
        return "Right side";
      case 3:
        return "Left Side";
      case 4:
        return "Back Side";
      default:
        return "Driver profile";
    }
  };

  userstatuss = status => {
    switch (status) {
      case 1:
        return "Inspected";
        break;
      case 2:
        return "Approved";
        break;
      case 3:
        return "Rejected";
        break;
      default:
        return "";
        break;
    }
  };

  userStatus = status => {
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
            Ongoing
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

  render() {
    const { getinspectiondetails,rideDetailsData } = this.props;
      

    var results = {};
    var carImages = [];
    if (rideDetailsData != null) {
      results = rideDetailsData;
      var rideDateTime = results.rideDateTime;
      var endLocation = results.endLocation;
      var isDrive = results.isDrive;
      var startLocation = results.startLocation;
      var status = results.status;
      var estimatedFare = results.estimatedFare;
      var profile_pic = results.profile_pic;
      var ridersList = results.ridersList.length;
      var onBoard = results.onBoard.length;
      var joinRequest = results.joinRequest.length;
    
      
     
    }
    //userlist table data

    return (
      <div className="animated fadeIn">
        <Row className="mt-4">
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Driver Ride Details 
                {results.userName ? " for " +results.userName:''}
                
              </CardHeader>
            </Card>
          </Col>
        </Row>
        <Row className="mt-4">
          
          <Col>
          <Card className="cardRadius">
              <CardHeader className="cardHead">Driver Ride Details</CardHeader>
              <CardBody className="cardBody">
                <form class="form-inline">
                  <div class="form-group">
                    <label for="inputPassword6">Ride Date Time</label>
                    <input type="text" id="inputPassword6" class="form-control mx-sm-3" value={rideDateTime} aria-describedby="passwordHelpInline" disabled />
                  </div>
                  <div class="form-group">
                    <label for="inputPassword6">Start Location</label>
                    <input type="text" id="inputPassword6" class="form-control mx-sm-3" value={startLocation} aria-describedby="passwordHelpInline" disabled />
                    
                  </div>
                  <div class="form-group">
                    <label for="inputPassword6">End Location</label>
                    <input type="text" id="inputPassword6" class="form-control mx-sm-3" value={endLocation} aria-describedby="passwordHelpInline" disabled />
                  </div>
                  <div class="form-group">
                    <label for="inputPassword6">Estimated Fare</label>
                    <input type="text" id="inputPassword6" class="form-control mx-sm-3" value={estimatedFare} aria-describedby="passwordHelpInline" disabled />
                  </div>
                  <div class="form-group">
                    <label for="inputPassword6"> Status  <span style={{'padding-left': '12px'}}>{this.userStatus(status)}</span></label>
                     
                  
                  </div>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col>
          <div>   
   {status!=14 ? <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: this.state.activeTab === '3' })}
            onClick={() => { this.toggle('3'); }}
          >
            <span style={{color:'#ac2925'}}>Join Request</span>
            
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            className={classnames({ active: this.state.activeTab === '2' })}
            onClick={() => { this.toggle('2'); }}
          >
            <span style={{color:'#2e6da4'}}>OnBoard</span>
            
          </NavLink>
        </NavItem>

       

        <NavItem>
          <NavLink
            className={classnames({ active: this.state.activeTab === '1' })}
            onClick={() => { this.toggle('1'); }}
          >
            <span style={{color:'#398439'}}>Rider List</span>
          </NavLink>
        </NavItem>
      </Nav> : <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: this.state.activeTab === '1' })}
            onClick={() => { this.toggle('1'); }}
          >
            <span style={{color:'#398439'}}>Rider List</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: this.state.activeTab === '2' })}
            onClick={() => { this.toggle('2'); }}
          >
            <span style={{color:'#2e6da4'}}>OnBoard</span>
            
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            className={classnames({ active: this.state.activeTab === '3' })}
            onClick={() => { this.toggle('3'); }}
          >
            <span style={{color:'#ac2925'}}>Join Request</span>
            
          </NavLink>
        </NavItem>
      </Nav>}
          

      
      
      <TabContent activeTab={this.state.activeTab}>
        <TabPane tabId="1">
        <Card className="cardRadius">
              <CardHeader className="cardHead" style={{color:'#398439'}}>Passenger List</CardHeader>
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

                  {ridersList  ? 
                    ridersList.map((data,index)=>{
                      return (<tr>
                        <td>{data.userName}</td>
                        <td>{data.email}</td>
                        <td>{data.mobileNo}</td>
                        <td>{data.rideDateTime}</td>
                        <td>{data.startLocation}</td>
                        <td>{data.endLocation}</td>
                        <td>{data.noOfSeats}</td>
                        <td>{data.estimatedFare}</td>
                        <td>{data.payStatus ? <Button color="success" size="sm">Paid</Button>:<Button color="danger" size="sm">Unpaid</Button>}</td>
                      </tr>)
                    })
                  :<tr><td>No Record Found.</td></tr>}
                </tbody>
              </Table>
            </Card>
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

                  {/* {onBoard  ? 
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
                  :<tr><td>No Record Found.</td></tr>} */}

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
  const { getinspectiondetails,rideDetailsData, userstatus } = alluserlist;
  return { getinspectiondetails,rideDetailsData, userstatus };
};
export default withRouter(
  connect(mapStateToProps, { getInspectionData, inspectionApproveOrReject,getRidesDetails })(
    RideDetails
  )
);
