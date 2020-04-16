import React, { Component, Fragment } from "react";
import { Table, Container, Button } from "reactstrap";
import { connect } from "react-redux";
import { getConfigs, deleteConfig } from "../../../actions/configAction";
import PropTypes from "prop-types";
import ConfirmButtonModal from "../../common/ConfirmBoxModal";
import FormModal from "../../common/FormModal";
import ConfigForm from "./ConfigForm";
import SharedPagination from "../../common/SharedPagination";
import _ from "lodash";

class Configs extends Component {
  static propTypes = {
    getConfigs: PropTypes.func.isRequired,
    config: PropTypes.object,
    isAuthenticated: PropTypes.bool
  };

  state = { configById: "", currentPage: 1 };
  componentDidMount() {
    this.props.getConfigs();
  }

  onDeleteClick = id => {
    this.props.deleteConfig(id);
  };

  onConfirmClick = () => {
    this.ConfirmButtonModal.toggle();
  };
  onShowFormClick = () => {
    this.setState({
      configById: { name: "", description: "", value: "" },
      action: "ADD"
    });
    this.FormModal.toggle();
  };
  formSubmitClick = e => {
    this.ConfigForm.onSubmit(e);
    this.FormModal.toggle();
  };
  onDoubleClick = data => {
    this.setState({ configById: data, action: "EDIT" });
    this.FormModal.toggle();
  };

  onPageChange = number => {
    this.setState({ currentPage: number });
  };

  render() {
    const { configs } = this.props.config;
    const postsPerPage = 7;
    const addButton = (
      <Button
        className="add-btn mr-auto float-right"
        color="primary"
        size="sm"
        onClick={this.onShowFormClick.bind(this)}
      >
        Add Config
      </Button>
    );

    const addModalButton = (
      <FormModal
        onRef={formModalRef => (this.FormModal = formModalRef)}
        button={addButton}
        formModalHeader={{ Msg: `${this.state.action} CONFIG` }}
        formModalFooter={{ callbackFunc: this.formSubmitClick.bind(this) }}
        formModalBody={
          <ConfigForm
            onRef={configFormRef => (this.ConfigForm = configFormRef)}
            config={this.state.configById}
            action={this.state.action}
          ></ConfigForm>
        }
        size={"lg"}
      ></FormModal>
    );

    const tableItem = (config, index) => {
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
          callbackFunc={this.onDeleteClick.bind(this, config._id)}
          message="Delete Config"
        ></ConfirmButtonModal>
      );

      return (
        <tr
          key={config._id}
          onDoubleClick={this.onDoubleClick.bind(this, config)}
        >
          <th scope="row">{index}</th>
          <td>{config.name}</td>
          <td>{config.description}</td>
          <td>{modalButton}</td>
        </tr>
      );
    };
    return (
      <Fragment>
        <Container>{addModalButton}</Container>
        <div className="mt-5">
          <Container>
            <Table dark hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Delete Action</th>
                </tr>
              </thead>
              <tbody>
                {configs.map((config, index) => {
                  if (
                    index >= (this.state.currentPage - 1) * postsPerPage &&
                    index < this.state.currentPage * postsPerPage
                  ) {
                    return tableItem(config, index + 1);
                  }
                })}
              </tbody>
            </Table>
          </Container>
        </div>
        <SharedPagination
          totalPosts={configs.length}
          postsPerPage={postsPerPage}
          changePageFunc={this.onPageChange.bind(this)}
        ></SharedPagination>
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  config: state.config,
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(
  mapStateToProps,
  { getConfigs, deleteConfig }
)(Configs);
