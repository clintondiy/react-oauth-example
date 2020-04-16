import React, { Component, Fragment } from "react";
import { Form, FormGroup, Label, Input, Col } from "reactstrap";
import { connect } from "react-redux";
import { updateConfig, addConfig } from "../../../actions/configAction";
class ConfigForm extends Component {
  state = { name: "", description: "", value: "", action: "" };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    if (this.props.action === "ADD") {
      e.preventDefault();
      const { name, description, value } = this.state;
      const newConfig = {
        name,
        description,
        value
      };

      this.props.addConfig(newConfig);
    } else if (this.props.action === "EDIT") {
      const { value } = this.state;
      const updatedConfig = {
        value
      };
      this.props.updateConfig(this.props.config._id, updatedConfig);
    } else {
      console.log("unknown action");
    }
  };

  componentDidMount() {
    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  render() {
    const createFormGroup = (data, action) => {
      return (
        <Fragment>
          <FormGroup row>
            <Label sm={2}>Name</Label>
            <Col sm={10}>
              <Input
                type="name"
                name="name"
                id="name"
                placeholder="name"
                defaultValue={action === "ADD" ? "" : data ? data.name : ""}
                onChange={this.onChange}
                disabled={action === "ADD" ? false : true}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2}>Description</Label>
            <Col sm={10}>
              <Input
                type="description"
                name="description"
                id="description"
                placeholder="description"
                defaultValue={
                  action === "ADD" ? "" : data ? data.description : ""
                }
                onChange={this.onChange}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2}>Value</Label>
            <Col sm={10}>
              <Input
                type="textarea"
                name="value"
                rows={10}
                id="value"
                placeholder="value"
                defaultValue={action === "ADD" ? "" : data ? data.value : ""}
                onChange={this.onChange}
              />
            </Col>
          </FormGroup>
        </Fragment>
      );
    };

    return (
      <Fragment>
        <Form onSubmit={this.onSubmit}>
          {createFormGroup(this.props.config, this.props.action)}
        </Form>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(
  mapStateToProps,
  { updateConfig, addConfig }
)(ConfigForm);
