import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Col
} from "reactstrap";
import { connect } from "react-redux";
import { getRoles } from "../../../actions/roleAction";
import { getInfos, updateInfo } from "../../../actions/infoAction";
import PropTypes from "prop-types";
import _ from "lodash";

class UserModal extends Component {
  state = {};

  static propTypes = {
    getRoles: PropTypes.func.isRequired,
    role: PropTypes.object,
    info: PropTypes.object,
    isAuthenticated: PropTypes.bool
  };
  componentDidMount() {
    this.props.getRoles();
    this.props.getInfos();
  }

  toggle = () => {
    this.props.toggle();
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();

    const { firstName, lastName, countryCode, phone } = this.state;

    const updatedInfo = {
      firstName,
      lastName,
      phone: { countryCode, phoneNumber: phone }
    };

    this.props.updateInfo(this.props.user.info, updatedInfo);
    //Close modal
    this.toggle();
  };

  render() {
    const { user, role, info } = this.props;
    const currentInfo = user ? _.find(info.infos, { _id: user.info }) : {};
    const roleOptions = role => {
      return <option key={role._id}>{role.name}</option>;
    };

    return (
      <div>
        <Modal
          size="xl"
          color={"dark"}
          isOpen={this.props.isOpen}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>User Infomation</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
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
                    onChange={this.onChange}
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
                    onChange={this.onChange}
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
                    onChange={this.onChange}
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
                      onChange={this.onChange}
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
                      onChange={this.onChange}
                    />
                  </Col>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="roleSelect" sm={2}>
                  Select
                </Label>
                <Col sm={10}>
                  <Input
                    type="select"
                    name="role"
                    id="role"
                    onChange={this.onChange}
                  >
                    {role.roles.map(option => roleOptions(option))}
                  </Input>
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
                        onChange={this.onChange}
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
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  role: state.role,
  info: state.info
});
export default connect(
  mapStateToProps,
  { getRoles, getInfos, updateInfo }
)(UserModal);
