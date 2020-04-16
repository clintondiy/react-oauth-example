import React, { Component } from "react";
import io from 'socket.io-client'

import {
  Col,
  Alert,
  Form,
  FormGroup,
  Input,
  Container,
  Button
} from "reactstrap";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import OAuth from "./OAuth";
import { login } from "../../actions/authAction";
import { clearErrors } from "../../actions/errorAction";

const { API_URL, API_OAUTH_URL } = require('./../../config')
const socket = io(API_OAUTH_URL);
const providers = ['facebook']
console.log(socket);

class SignIn extends Component {
  state = {
    username: "",
    password: "",
    msg: null
  };
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearError: PropTypes.func
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;

    if (error !== prevProps.error) {
      //check for register error
      if (error.id === "LOGIN_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    if (isAuthenticated) {
      this.props.clearErrors();
      this.props.history.push({
        pathname: "/Users"
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { username, password } = this.state;

    const user = {
      username,
      password
    };

    this.props.login(user);
  };
  render() {
    return (
      <Container>
        {this.state.msg ? (
          <Alert color="danger"> {this.state.msg}</Alert>
        ) : null}
        <Form onSubmit={this.onSubmit} className="box">
          <Col>
            <h1>Sign In</h1>
          </Col>
          <Col>
            <FormGroup>
              <Input
                type="username"
                name="username"
                id="username"
                placeholder="Username"
                onChange={this.onChange}
              />
            </FormGroup>
          </Col>

          <Col>
            <FormGroup>
              <Input
                type="password"
                name="password"
                id="examplePassword"
                placeholder="Password"
                onChange={this.onChange}
              />
            </FormGroup>
          </Col>
          <Col>
            <Button type="submit" placeholder="Login">
              Submit
            </Button>
          </Col>
        </Form>
        <Container>
          {providers.map(provider =>
            <OAuth
              provider={provider}
              key={provider}
              socket={socket}
            />
          )}
        </Container>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});
export default connect(
  mapStateToProps,
  { login, clearErrors }
)(SignIn);
