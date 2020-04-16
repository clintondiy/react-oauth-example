import React, { Component } from "react";
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardImg,
  Button
} from "reactstrap";
import RelativeModal from "./RelativeModal";
import { deleteProfile } from "../../actions/profileAction";
import { connect } from "react-redux";
class ProfileCard extends Component {
  state = {
    img: {}
  };
  showLastUpdate = modifyDate => {
    var minutes = this.calculateMinutesDiff(modifyDate);
    switch (true) {
      case minutes < 60:
        return minutes.toString() + " mins ago";
      case minutes >= 60 && minutes < 60 * 24:
        return Math.floor(minutes / 60).toString() + " hours ago";
      case minutes >= 60 * 24:
        return Math.floor(minutes / (60 * 24)).toString() + " days ago";
      default:
        return "";
    }
  };

  calculateMinutesDiff = modifyDate => {
    var date1 = new Date(modifyDate);
    var date2 = new Date();

    var oneMinute = 60 * 1000;

    var date1_ms = date1.getTime();
    var date2_ms = date2.getTime();

    var difference_ms = date2_ms - date1_ms;

    var timeDiff = Math.round(difference_ms / oneMinute);
    return timeDiff;
  };

  arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));

    bytes.forEach(b => (binary += String.fromCharCode(b)));

    return window.btoa(binary);
  }

  componentDidMount() {
    var base64Flag = "data:" + this.props.profile.img.contentType + ";base64,";
    var imageStr = this.arrayBufferToBase64(this.props.profile.img.data.data);

    this.setState({ img: base64Flag + imageStr });
  }

  onDeleteClick = id => {
    this.props.deleteProfile(id);
  };

  render() {
    const deleteButton = (
      <Button
        className="float-right"
        color="danger"
        style={{ marginBottom: "2rem" }}
        onClick={this.onDeleteClick.bind(this, this.props.profile._id)}
      >
        X
      </Button>
    );
    //console.log(this.props.profile._id);
    return (
      <Card className="profile-card">
        <CardBody>
          {deleteButton}
          <CardTitle>{this.props.profile.number}</CardTitle>
          <CardImg
            top
            height="auto"
            width="100%"
            src={this.state.img}
            alt="Card image cap"
          ></CardImg>
          <CardText>{this.props.profile.description}</CardText>
          <RelativeModal>Relative</RelativeModal>
          <CardText>
            <small className="text-muted">
              Last updated {this.showLastUpdate(this.props.profile.modifyDate)}
            </small>
          </CardText>
        </CardBody>
      </Card>
    );
  }
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(
  mapStateToProps,
  { deleteProfile }
)(ProfileCard);
