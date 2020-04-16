import React, { Component } from "react";
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
import { register } from "../../actions/authAction";
import { clearErrors } from "../../actions/errorAction";

class SignUp extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    msg: null
  };
  componentDidUpdate(prevProps) {
    const { error } = this.props;

    if (error !== prevProps.error) {
      //check for register error
      if (error.id === "REGISTER_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearError: PropTypes.func
  };

  onclickSignUp = id => {
    this.props.addUser(id);
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { username, email, password } = this.state;
    const newUser = {
      username,
      email,
      password
    };
    this.props.register(newUser);
  };
  render() {
    return (
      <Container>
        {this.state.msg ? (
          <Alert color="danger"> {this.state.msg}</Alert>
        ) : null}
        <Form onSubmit={this.onSubmit} className="box">
          <Col>
            <h1>Sign Up</h1>
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
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="Email"
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
  { register, clearErrors }
)(SignUp);
