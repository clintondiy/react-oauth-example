import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  FormText
} from "reactstrap";
import {} from "../../actions/bookingAction";
import { getUsers } from "../../actions/userAction";

const BookingForm = () => {
  const users = useSelector(state => state.auth.user);

  const user = {};
  const role = {};
  const roleOptions = {};
  const currentInfo = {};

  const onSubmit = () => {};
  const onChange = () => {};
  const onClick = () => {
    console.log(users);
  };
  return (
    <Container>
      <Button onClick={onClick}></Button>
      <Form onSubmit={onSubmit}>
        <FormGroup row>
          <Label sm={2}>Username</Label>
          <Col sm={10}>
            <Label sm={12} color="muted">
              {user ? user.username : ""}
            </Label>
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="exampleEmail" sm={2}>
            Email
          </Label>
          <Col sm={10}>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="with a placeholder"
              defaultValue={user ? user.email : ""}
              onChange={onChange}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="firstName" sm={2}>
            First Name
          </Label>
          <Col sm={10}>
            <Input
              type="firstName"
              name="firstName"
              id="firstName"
              placeholder="First Name"
              defaultValue={currentInfo ? currentInfo.firstName : ""}
              onChange={onChange}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="lastName" sm={2}>
            Last Name
          </Label>
          <Col sm={10}>
            <Input
              type="lastName"
              name="lastName"
              id="lastName"
              placeholder="Last Name"
              defaultValue={currentInfo ? currentInfo.lastName : ""}
              onChange={onChange}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Col md={3}>
            <Col sm={12}>
              <Label for="CountryCode">Country Code</Label>
            </Col>
            <Col sm={12}>
              <Input
                type="countryCode"
                name="countryCode"
                id="countryCode"
                placeholder="Country Code"
                defaultValue={currentInfo ? currentInfo.lastName : ""}
                onChange={onChange}
              />
            </Col>
          </Col>
          <Col md={9}>
            <Col sm={10}>
              <Label for="phone">Phone</Label>
            </Col>
            <Col sm={10}>
              <Input
                type="phone"
                name="phone"
                id="phone"
                placeholder="phone"
                defaultValue={currentInfo ? currentInfo.lastName : ""}
                onChange={onChange}
              />
            </Col>
          </Col>
        </FormGroup>

        <FormGroup row>
          <Col sm={{ size: 10 }}>
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name="disable"
                  id="disable"
                  onChange={onChange}
                />
                Disable?
              </Label>
            </FormGroup>
          </Col>
        </FormGroup>

        <FormGroup row>
          <Col sm={{ size: 10 }}>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" id="reset" /> Reset?
              </Label>
            </FormGroup>
          </Col>
        </FormGroup>
        <FormGroup check row>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button>Submit</Button>
          </Col>
        </FormGroup>
      </Form>
    </Container>
  );
};

export default BookingForm;
