import React, { Component, Fragment } from "react";
import { Table, Container, Button } from "reactstrap";
import { connect } from "react-redux";
import { getRoles, deleteRole } from "../../../actions/roleAction";
import PropTypes from "prop-types";
import ConfirmButtonModal from "../../common/ConfirmBoxModal";

class Roles extends Component {
  static propTypes = {
    getRoles: PropTypes.func.isRequired,
    role: PropTypes.object,
    isAuthenticated: PropTypes.bool
  };

  componentDidMount() {
    this.props.getRoles();
  }

  onDeleteClick = id => {
    this.props.deleteRole(id);
  };

  onConfirmClick = () => {
    this.ConfirmButtonModal.toggle();
  };
  render() {
    const { roles } = this.props.role;

    const tableItem = (role, index) => {
      const deleteButton = (
        <Button
          className="remove-btn"
          color="danger"
          size="sm"
          onClick={this.onConfirmClick.bind(this)}
        >
          &times;
        </Button>
      );

      const modalButton = (
        <ConfirmButtonModal
          onRef={ref => (this.ConfirmButtonModal = ref)}
          button={deleteButton}
          callbackFunc={this.onDeleteClick.bind(this, role._id)}
          message="Delete Role"
        ></ConfirmButtonModal>
      );
      return (
        <tr key={role._id}>
          <th scope="row">{index}</th>
          <td>{role.name}</td>
          <td>{role.description}</td>
          <td>{role.name === "administrator" ? " " : modalButton}</td>
        </tr>
      );
    };
    return (
      <Fragment>
        <Container>
          <Table dark hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role, index) => tableItem(role, index + 1))}
            </tbody>
          </Table>
        </Container>
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  role: state.role,
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(
  mapStateToProps,
  { getRoles, deleteRole }
)(Roles);
