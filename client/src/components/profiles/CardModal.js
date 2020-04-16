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
  Row
} from "reactstrap";
import { FilePond } from "react-filepond";
import { connect } from "react-redux";
import { addProfile } from "../../actions/profileAction";
import PropTypes from "prop-types";

class CardModal extends Component {
  state = {
    modal: false,
    name: "",
    description: "",
    number: 0
  };

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
      number: this.state.number,
      image: this.state.files[0]
    };
    //add item
    this.props.addProfile(newProfile);

    //Close modal
    this.toggle();
  };

  onUpdateFiles = fileItems => {
    this.setState({ files: fileItems.map(fileItem => fileItem.file) });
  };

  render() {
    const addButton = (
      <Button
        color="dark"
        style={{ marginBottom: "2rem" }}
        onClick={this.toggle}
      >
        Add Profile
      </Button>
    );

    return (
      <div>
        {this.props.isAuthenticated ? addButton : ""}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add To New Profie</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">Profile</Label>
                <Row className="m-2">
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    onChange={this.onChange}
                  />
                </Row>
                <Row className="m-2">
                  <Input
                    type="text"
                    name="number"
                    id="number"
                    placeholder="Number"
                    onChange={this.onChange}
                  />
                </Row>
                <Row className="m-2">
                  <Input
                    type="text"
                    name="description"
                    id="description"
                    placeholder="Description"
                    onChange={this.onChange}
                  />
                </Row>
                <FilePond
                  onupdatefiles={this.onUpdateFiles}
                  name="image"
                  ref={ref => (this.pond = ref)}
                />
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Add Item
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(
  mapStateToProps,
  { addProfile }
)(CardModal);
