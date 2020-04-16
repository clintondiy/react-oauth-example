import React, { Component } from "react";
import {
  Col,
  Form,
  FormGroup,
  Input,
  Container,
  Button,
  Row,
  Label
} from "reactstrap";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../../actions/authAction";
import { clearErrors } from "../../actions/errorAction";

class Workshop extends Component {
  state = {
  };

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h1>Workshop</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <h1>Reserve</h1>
          </Col>
        </Row>
        <Form>
          <FormGroup>
            <Label for="">Date</Label>
            <Input type="email" name="email" id="" placeholder="" />
          </FormGroup>
          <FormGroup>
            <Label for="">Workshop</Label>
            <Input type="email" name="email" id="" placeholder="" />
          </FormGroup>
          <FormGroup>
            <Label for="">Contact Person</Label>
            <Input type="text" name="email" id="" placeholder="" />
          </FormGroup>
          <FormGroup>
            <Label for="">Email</Label>
            <Input type="email" name="email" id="" placeholder="" />
          </FormGroup>
          <FormGroup>
            <Label for="">Contact No.</Label>
            <Input type="text" name="email" id="" placeholder="" />
          </FormGroup>
          <Button type="submit" placeholder="">
              Submit
            </Button>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(Workshop);
