import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  ListGroup,
  ListGroupItem,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import {
  getInspectionData,
  inspectionApproveOrReject
} from "../../actions/DeshboardAction";
import { MDBDataTable } from "mdbreact";
import Modal from "react-responsive-modal";

class InspectionApproval extends Component {
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
      reject_comment: ""
    };
  }
  componentDidMount() {
    let id = this.props.location.state ? this.props.location.state[0].id : "";

    if (id) {
      this.props.getInspectionData(id);
    } else {
      this.props.history.push("approvallist");
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

  render() {
    const { getinspectiondetails } = this.props;

    var results = {};
    var carImages = [];
    if (getinspectiondetails != null) {
      results = getinspectiondetails;
      carImages = results.carImages;
      var userId = results._id;
      var approvalStatus = results.approvalStatus;
      let trueImg = `../../assets/img/ic_correct.png`;
      let falseImg = `../../assets/img/ic_wrong.png`;
      var isACWorking = results.carCondition.isACWorking ? trueImg : falseImg;
      var isSeatbeltWorking = results.carCondition.isSeatbeltWorking
        ? trueImg
        : falseImg;
      var upholstery = results.carCondition.upholstery ? trueImg : falseImg;
      var paint = results.carCondition.paint ? trueImg : falseImg;
      var dash = results.carCondition.dash ? trueImg : falseImg;
      var tire = results.carCondition.tire ? trueImg : falseImg;
      var mirror = results.carCondition.mirror ? trueImg : falseImg;
      var lights = results.carCondition.lights ? trueImg : falseImg;
      var mechanical = results.carCondition.mechanical ? trueImg : falseImg;
      var breaks = results.carCondition.breaks ? trueImg : falseImg;
      var suspension = results.carCondition.suspension ? trueImg : falseImg;
      var engine = results.carCondition.engine ? trueImg : falseImg;
      var comment = results.carCondition.comment;
      var inspectionBy = results.inspectionBy.userName;
      inspectionBy =
        inspectionBy.charAt(0).toUpperCase() + inspectionBy.substring(1);
    }
    //userlist table data

    return (
      <div className="animated fadeIn">
        <Row className="mt-4">
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Approval{" for "}
                {results.userName}
                {" Inspected By "} {inspectionBy}
              </CardHeader>
            </Card>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <Card className="cardRadius">
              <CardHeader className="cardHead">Car Details</CardHeader>
              <CardBody className="cardBody">
                <table className="table contentTable">
                  <tbody>
                    <tr>
                      <th>Car Brand</th>
                      <td>:</td>
                      <td>{results.vehicleBrand}</td>
                    </tr>
                    <tr>
                      <th>Car Model</th>
                      <td>:</td>
                      <td>{results.vehicle}</td>
                    </tr>
                    <tr>
                      <th>Car Number</th>
                      <td>:</td>
                      <td>{results.vehicleNumber}</td>
                    </tr>
                    <tr>
                      <th>Car Color</th>
                      <td>:</td>
                      <td>{results.vehicleColor}</td>
                    </tr>
                    <tr>
                      <th>Car Year</th>
                      <td>:</td>
                      <td>{results.vehicleYear}</td>
                    </tr>
                  </tbody>
                </table>
              </CardBody>
            </Card>

            <Card className="cardRadius">
              <CardHeader className="cardHead">Car Inspection</CardHeader>
              <CardBody className="cardBody">
                <Row className="mt-4">
                  {carImages.length > 0
                    ? carImages.map(element => (
                        <Col xs="4">
                          <div className="inpecImgCont">
                            <img src={element.name} alt="carimage" />
                            <h3>{this.carImgSide(element.imageSide)}</h3>
                          </div>
                        </Col>
                      ))
                    : "No CarImage found"}
                </Row>
              </CardBody>
            </Card>
            <Card className="cardRadius">
              <CardHeader className="cardHead">Driver Details</CardHeader>
              <CardBody className="cardBody">
                <table className="table contentTable">
                  <tbody>
                    <tr>
                      <th>Driver Name</th>
                      <td>:</td>
                      <td>{results.userName}</td>
                    </tr>
                    <tr>
                      <th>Driver Contact Number</th>
                      <td>:</td>
                      <td>{results.mobileNo}</td>
                    </tr>
                    <tr>
                      <th>Driver Email</th>
                      <td>:</td>
                      <td>{results.email}</td>
                    </tr>
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card className="cardRadius">
              <CardHeader className="cardHead">Car Condition</CardHeader>
              <CardBody className="cardBody">
                <ListGroup className="listContainer">
                  <ListGroupItem>
                    AC Working
                    <img src={isACWorking} alt="car" />
                  </ListGroupItem>
                  <ListGroupItem>
                    Seatbelt Working
                    <img src={isSeatbeltWorking} alt="car" />
                  </ListGroupItem>
                  <ListGroupItem>
                    Upholstery Condition
                    <img src={upholstery} alt="car" />
                  </ListGroupItem>
                  <ListGroupItem>
                    Paint Condition
                    <img src={paint} alt="car" />
                  </ListGroupItem>
                  <ListGroupItem>
                    Dash Condition
                    <img src={dash} alt="car" />
                  </ListGroupItem>
                  <ListGroupItem>
                    Tire Condition
                    <img src={tire} alt="car" />
                  </ListGroupItem>
                  <ListGroupItem>
                    Mirrors
                    <img src={mirror} alt="car" />
                  </ListGroupItem>
                  <ListGroupItem>
                    Lights
                    <img src={lights} alt="car" />
                  </ListGroupItem>
                  <ListGroupItem>
                    Mechanical Condition
                    <img src={mechanical} alt="car" />
                  </ListGroupItem>
                  <ListGroupItem>
                    Breaks
                    <img src={breaks} alt="car" />
                  </ListGroupItem>
                  <ListGroupItem>
                    Suspension
                    <img src={suspension} alt="car" />
                  </ListGroupItem>
                  <ListGroupItem>
                    Engine
                    <img src={engine} alt="car" />
                  </ListGroupItem>
                </ListGroup>

                <FormGroup style={{ margin: "20px" }}>
                  <Label for="exampleText">Comment</Label>
                  <Input
                    type="textarea"
                    name="text"
                    id="exampleText"
                    style={{ height: "150px" }}
                    value={comment}
                  />
                </FormGroup>
              </CardBody>
            </Card>
            {approvalStatus === 1 ? (
              [
                <Button
                  color="danger"
                  size="lg"
                  onClick={() => this.onOpenModal(0)}
                >
                  Reject
                </Button>,
                [" "],
                <Button
                  color="success"
                  size="lg"
                  onClick={() => this.onOpenModal(1)}
                >
                  Approve
                </Button>
              ]
            ) : approvalStatus === 2 ? (
              <Button color="success" size="lg" disabled>
                Approved
              </Button>
            ) : (
              <Button color="success" size="lg" disabled>
                Rejected
              </Button>
            )}
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <Modal
              open={this.state.openModel}
              onClose={this.onCloseModal}
              center
            >
              <Row className="align-items-center"></Row>
              <br />
              <br />
              <div className="align-items-center">
                <h3>
                  Are you sure you want to {this.state.isApprove} this driver?
                </h3>

                <br />
                {this.state.isApprove == "Reject" ? (
                  <FormGroup style={{ margin: "20px" }}>
                    <Label for="exampleText">Comment</Label>
                    <Input
                      type="textarea"
                      name="text"
                      id="exampleText"
                      required
                      style={{ height: "150px" }}
                      onChange={e =>
                        this.setState({ reject_comment: e.target.value })
                      }
                      value={this.state.reject_comment}
                    />
                  </FormGroup>
                ) : (
                  ""
                )}
                <Row className="align-items-center"></Row>
              </div>
              <Row className="align-items-center">
                <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                  <Button block onClick={this.onCloseModal} color="danger">
                    Cancel
                  </Button>
                </Col>
                <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                  <Button
                    block
                    onClick={() =>
                      this.changestatus_save(userId, this.state.isApprove)
                    }
                    color="success"
                  >
                    Save
                  </Button>
                </Col>
              </Row>
            </Modal>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ alluserlist }) => {
  const { getinspectiondetails, userstatus } = alluserlist;
  return { getinspectiondetails, userstatus };
};
export default withRouter(
  connect(mapStateToProps, { getInspectionData, inspectionApproveOrReject })(
    InspectionApproval
  )
);
