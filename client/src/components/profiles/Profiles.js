import React, { Component, Fragment } from "react";
import { Container } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Card from "./Card";
import { getProfiles, deleteProfile } from "../../actions/profileAction";
import CardModal from "./CardModal";

class Profiles extends Component {
  static propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };
  componentDidUpdate() {
    const { isAuthenticated } = this.props;
    if (!isAuthenticated) {
      //  / this.props.history.push({ pathname: "/SignIn" });
    }
  }
  componentDidMount() {
    this.props.getProfiles();
  }

  render() {
    const { profiles } = this.props.profile;
    const profileCard = profile => {
      return <Card key={profile._id} profile={profile} />;
    };

    return (
      <Fragment>
        <Container>
          <CardModal />
          {profiles.map(profile => profileCard(profile))}
        </Container>
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  profile: state.profile,
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(
  mapStateToProps,
  { getProfiles, deleteProfile }
)(Profiles);
