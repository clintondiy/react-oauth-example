import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class ConfirmBoxModal extends Component {
  state = { modal: false };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  onSubmit = e => {
    e.preventDefault();
    this.toggle();
  };

  componentDidMount() {
    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  render() {
    return (
      <div>
        <div>{this.props.button}</div>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Confirm</ModalHeader>
          <ModalBody>
            <ModalBody>Confirm to {this.props.message}?</ModalBody>
          </ModalBody>
          <ModalFooter>
            <Button color="dark" block onClick={this.props.callbackFunc}>
              Confirm
            </Button>
            <Button color="danger" block onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ConfirmBoxModal;
