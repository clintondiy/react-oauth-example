import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class FormModal extends Component {
  state = { modal: false };

  toggle = data => {
    if (data) {
      console.log(data);
    }
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
        <Modal
          size={this.props.size}
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          {this.props.formModalHeader ? (
            <ModalHeader toggle={this.toggle}>
              {this.props.formModalHeader.Msg}
            </ModalHeader>
          ) : (
            ""
          )}

          <ModalBody>{this.props.formModalBody}</ModalBody>
          {this.props.formModalFooter ? (
            <ModalFooter>
              <Button
                color="dark"
                block
                onClick={this.props.formModalFooter.callbackFunc}
              >
                Confirm
              </Button>
              <Button color="danger" block onClick={this.toggle}>
                Cancel
              </Button>
            </ModalFooter>
          ) : (
            ""
          )}
        </Modal>
      </div>
    );
  }
}

export default FormModal;
