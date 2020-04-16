// Import Components
import React, { Component } from "react";
import AppNavbar from "./components/AppNavbar";
// import AppFooter from "./components/AppFooter";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Workshop from "./components/public/Workshop";
import { loadUser } from "./actions/authAction";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter, Route, Switch } from "react-router-dom";
//CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "./Main.css";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Import Private Route Components
import { PrivateRoute } from "./components/auth/PrivateRoute";
import Profiles from "./components/profiles/Profiles";
import Users from "./components/config/user/Users";
import Configs from "./components/config/config/Configs";
import Roles from "./components/config/role/Roles";
import Landing from "./components/landing/Landing";
import BookingInfo from "./components/booking/BookingInfo";
// Import React FilePond
import { registerPlugin } from "react-filepond";

// Import the Image EXIF Orientation and Image Preview plugins
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <AppNavbar />

            <Switch>
              <Route path="/workshop" component={Workshop} />

              <Route path="/signIn" component={SignIn} />
              <Route path="/signUp" component={SignUp} />
              <Route path="/users" component={Users} />
              <Route path="/configs" component={Configs} />
              <Route path="/roles" component={Roles} />
              <Route path="/booking" component={BookingInfo} />
              <PrivateRoute path="/Profiles" component={Profiles} />
              <Route path="/" component={Landing} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
