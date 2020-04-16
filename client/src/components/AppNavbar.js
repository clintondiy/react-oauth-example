import React, { Component, Fragment } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Logout from "./auth/Logout";

class AppNavbar extends Component {
  state = {
    isOpen: false,
    ConfigDropDown: false,
    publicDropDown: false
  };

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  toggle = e => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  DropdownToggleFunc = e => {
    this.setState({ [e.target.name]: !this.state[e.target.name] });
  };
  render() {
    const { isAuthenticated, user } = this.props.auth;

    const ChoiceLink = (
      <Fragment>
        <NavItem>
          <NavLink href="/Profiles">Profiles</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/Booking">Booking</NavLink>
        </NavItem>
        <Dropdown
          nav
          isOpen={this.state.ConfigDropDown}
          toggle={this.DropdownToggleFunc}
          onMouseEnter={this.DropdownToggleFunc}
        >
          <DropdownToggle name="ConfigDropDown" nav caret>
            Config
          </DropdownToggle>
          <DropdownMenu color="dark">
            <DropdownItem header>User</DropdownItem>
            <DropdownItem href="./users">User Maintainance</DropdownItem>
            <DropdownItem href="./roles">Role Maintainance</DropdownItem>
            <DropdownItem header>Other</DropdownItem>
            <DropdownItem href="./configs">Config Maintainance</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Fragment>
    );

    const authLinks = (
      <Fragment>
        <NavItem>
          <span className="navbar-text mr-3">
            <strong>{user ? `Welcome ${user.username}` : ""}</strong>
          </span>
        </NavItem>
        <NavItem>
          <Logout />
        </NavItem>
      </Fragment>
    );

    const publicLinks = (
      <>
        <Dropdown
          nav
          isOpen={this.state.publicDropDown}
          toggle={this.DropdownToggleFunc}
          onMouseEnter={this.DropdownToggleFunc}
        >
          <DropdownToggle name="publicDropDown" nav caret>
            Molook Jewellery
            </DropdownToggle>
          <DropdownMenu color="">
            <DropdownItem href="./workshop">Workshop</DropdownItem>
            <DropdownItem href="./tailor">Tailor Made</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </>
    );

    const guestLinks = (
      <Fragment>
        <NavItem>
          <NavLink href="./signUp">Sign Up</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="./signIn">Sign In</NavLink>
        </NavItem>
      </Fragment>
    );

    return (
      <Fragment>
        <Navbar color="dark" dark expand="sm">
          <Container>
            <NavbarBrand href="/">Marshmallow</NavbarBrand>
            <NavbarToggler name="isOpen" onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="mr-auto" navbar>
                {publicLinks}
              </Nav>
              <Nav className="mr-auto" navbar>
                {isAuthenticated ? ChoiceLink : ""}
              </Nav>
              <Nav className="ml-auto" navbar>
                {isAuthenticated ? authLinks : guestLinks}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(AppNavbar);
