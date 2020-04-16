import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody
} from "reactstrap";

import { connect } from "react-redux";
import PropTypes from "prop-types";

class RelativeModal extends Component {
  state = { modal: false, name: "", description: "" };

  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const newProfile = {
      name: this.state.name,
      description: this.state.description,
      number: this.state.number
    };

    //add item
    this.props.addProfile(newProfile);

    //Close modal
    this.toggle();
  };

  render() {
    const addButton = (
      <Button
        color="dark"
        style={{ marginBottom: "2rem" }}
        onClick={this.toggle}
      >
        Relative
      </Button>
    );

    return (
      <div>
        {this.props.isAuthenticated ? addButton : ""}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add To New Profie</ModalHeader>
          <ModalBody>Testing</ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(
  mapStateToProps,
  null
)(RelativeModal);
