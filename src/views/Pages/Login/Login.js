import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";
import { connect } from "react-redux";
//import { withRouter,Redirect } from 'react-router-dom'
//import { Redirect,Redirect, Route, Switch } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import { Signin, userNamess, userpass } from "../../../actions/AuthActions";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      userNameError: "",
      passwordError: "",
      radioSelected: 2
    };

    if (localStorage.getItem("token") != null) {
      this.props.history.push("/dashboard");
    }
  }

  componentDidMount() {}

  onUserNameChange(e) {
    this.props.userNamess(e.target.value);
    this.setState({ userName: e.target.value });
  }

  onPasswordChange(e) {
    this.props.userpass(e.target.value);
    this.setState({ password: e.target.value });
  }

  //Validate custom add form
  validatecusform = () => {
    let isError = false;
    const errors = { userNameError: "", passwordError: "" };

    if (!this.state.userName) {
      isError = true;
      errors.userNameError = "Please enter username";
    } else if (!this.state.password) {
      isError = true;
      errors.passwordError = "Please enter password";
    }
    this.setState(errors);
    return isError;
  };

  handleSubmit = e => {
    e.preventDefault();
    const err = this.validatecusform();
    if (!err) {
      const dataTosend = {
        email: this.state.userName,
        password: this.state.password
      };
      this.props.Signin(dataTosend);
    }
  };

  render() {
    //console.log(this.props.loginfailed)
    return (

      <div className="app flex-row align-items-center">
        <Container>
          <Row>
            <div className="" style={{ margin: "0 auto 15px" }}>
              <img
                src={require("../../../assets/img/brand/logo.png")}
                className=""
                alt="logo"
              />
            </div>
          </Row>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.handleSubmit}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          placeholder="Username"
                          autoComplete="username"
                          value={this.state.userName}
                          onChange={this.onUserNameChange.bind(this)}
                          onFocus={e => this.setState({ userNameError: "" })}
                        />
                      </InputGroup>
                      <Row>
                        <InputGroup className="mb-4">
                          <div
                            style={{ color: "red" }}
                            className={this.state.userNameError ? "error" : ""}
                          >
                            {" "}
                            {this.state.userNameError}
                          </div>
                        </InputGroup>
                      </Row>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="password"
                          placeholder="Password"
                          value={this.state.password}
                          onChange={this.onPasswordChange.bind(this)}
                          autoComplete="current-password"
                          onFocus={e => this.setState({ passwordError: "" })}
                        />
                      </InputGroup>
                      <Row>
                        <InputGroup className="mb-4">
                          <div
                            style={{ color: "red" }}
                            className={this.state.passwordError ? "error" : ""}
                          >
                            {" "}
                            {this.state.passwordError}
                          </div>
                        </InputGroup>
                      </Row>
                      <Row>
                        <Col xs="6">
                          <Button
                            style={{ color: "#fff" }}
                            className="px-4 bg-brown"
                          >
                            Login
                          </Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          {/* <Button color="link" className="px-0">Forgot password?</Button> */}

                          <div style={{ color: "red" }}>
                            {" "}
                            {this.props.loginfailed != null
                              ? this.props.loginfailed
                              : ""}
                          </div>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                {/* <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card> */}
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { userName, loginfailed } = auth;
  return { userName, loginfailed };
};

export default withRouter(
  connect(mapStateToProps, { Signin, userNamess, userpass })(Login)
);
