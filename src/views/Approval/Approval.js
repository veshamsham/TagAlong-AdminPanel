import React, { Component } from "react";
import { Button, Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Allpendingdrivers, editstatus } from "../../actions/DeshboardAction";
import { MDBDataTable } from "mdbreact";

class Approval extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      columnsdata: [
        {
          label: "Driver Name",
          field: "userName",
          sort: "asc"
        },
        {
          label: "Mobile Number",
          field: "mobileNo",
          sort: "asc"
        },
        {
          label: "Email id",
          field: "email",
          sort: "asc"
        },
        {
          label: "Inspection By",
          field: "inspection",
          sort: "asc"
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
        }
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
  }
  componentDidMount() {
    this.props.Allpendingdrivers();
  }

  handleChange = event => {
    console.log(event.target.value);
    this.setState({ value: event.target.value });
  };

  toggleInputCase = (value, id) => {
    this.setState({ open: true, change_id: id, status_value: value });
    //this.props.editstatus(dataTosend)
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

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
            Pending
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

  render() {
    const { getpendingdrivers } = this.props;

    const results = [];
    if (getpendingdrivers != null) {
      getpendingdrivers.map((data, index) =>
        results.push({
          userName: data.userName,
          mobileNo: data.mobileNo,
          email: data.email,
          inspection: data.inspectionBy.userName,
          status: this.userstatuss(data.approvalStatus),
          action: (
            <Link
              to={{
                pathname: "/inspection-detail",
                state: [{ id: data._id }]
              }}
            >
              View Details
            </Link>
          )
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
        <Row className="mt-4">
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Inspection List
              </CardHeader>

              <CardBody className="dtbFooterhide ">
                <MDBDataTable
                  striped
                  bordered
                  entries={20}
                  entriesOptions={[20, 30, 50]}
                  data={data}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ alluserlist }) => {
  const { getpendingdrivers, userstatus } = alluserlist;
  return { getpendingdrivers, userstatus };
};
export default withRouter(
  connect(mapStateToProps, { Allpendingdrivers, editstatus })(Approval)
);
