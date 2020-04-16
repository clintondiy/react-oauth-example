import React, { Component, Fragment } from "react";
import { Table, Container, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getUsers, deleteUser } from "../../../actions/userAction";
import ConfirmButtonModal from "../../common/ConfirmBoxModal";
import PropTypes from "prop-types";
import UserModal from "./UserModal";
import ExportExcelReport from "../../common/ExportExcelReport";
import SharedPagination from "../../common/SharedPagination";

class Users extends Component {
  state = { isOpen: false, userById: {} };
  static propTypes = {
    getUsers: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };

  componentDidMount() {
    this.props.getUsers();
  }

  onDeleteClick = id => {
    this.props.deleteUser(id);
  };
  onConfirmClick = () => {
    this.ConfirmButtonModal.toggle();
  };
  toggle = id => {
    this.setState({
      isOpen: !this.state.isOpen,
      userById: this.props.user.users.find(user => (user.id = id))
    });
  };
  onPageChange = number => {
    this.setState({ currentPage: number });
  };
  render() {
    const { users } = this.props.user;
    const postsPerPage = 7;
    const test = (
      <ExportExcelReport
        fileName="Test excel"
        csvData={users}
      ></ExportExcelReport>
    );
    const tableItem = (user, index) => {
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
          callbackFunc={this.onDeleteClick.bind(this, user._id)}
          message="Delete User"
        ></ConfirmButtonModal>
      );

      return (
        <CSSTransition key={user._id} timeout={300} classNames="fade">
          <tr key={user._id} onDoubleClick={this.toggle}>
            <th scope="row">{index}</th>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.role ? (user.role.name ? user.role.name : "") : ""}</td>
            <td>{user.username === "admin" ? " " : modalButton}</td>
          </tr>
        </CSSTransition>
      );
    };
    return (
      <Fragment>
        <UserModal
          isOpen={this.state.isOpen}
          toggle={this.toggle.bind(this)}
          user={this.state.userById}
        ></UserModal>
        {test}
        <Container>
          <Table dark hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Email</th>
                <th>Roles</th>
                <th>Delete Action</th>
              </tr>
            </thead>

            <TransitionGroup component="tbody">
              {users.map((user, index) => tableItem(user, index + 1))}
            </TransitionGroup>
          </Table>
        </Container>
        <SharedPagination
          totalPosts={users.length}
          postsPerPage={postsPerPage}
          changePageFunc={this.onPageChange.bind(this)}
        ></SharedPagination>
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(
  mapStateToProps,
  { getUsers, deleteUser }
)(Users);
