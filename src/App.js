import React, { Component } from "react";
import "./App.css";
import { compose } from "redux";
import { connect } from "react-redux";
// import Login from "./components/Login/Login";
import { withSuspense } from "./hoc/withSuspense";
import { initializeApp } from "./redux/app-reducer";
import { Route, withRouter, Switch, Link, Redirect } from "react-router-dom";
import Preloader from "./components/common/Preloader/Preloader";
import HeaderContainer from "./components/Header/HeaderContainer";
import { Menu,Layout } from "antd";
import {
  LaptopOutlined,
  UserOutlined,
  MessageOutlined,
  QuestionOutlined
} from "@ant-design/icons";
import "antd/dist/antd.css";
import NotFoundPage from "./components/common/404/NotFoundPage";
import LoginAntd from "./components/Login/LoginAntd";


const { Content, Footer, Sider } = Layout;

const UsersContainer = React.lazy(() =>
  import("./components/Users/UsersContainer")
);
const DialogsContainer = React.lazy(() =>
  import("./components/Dialogs/DialogsContainer")
);
const ProfileContainer = React.lazy(() =>
  import("./components/Profile/ProfileContainer")
);

class App extends Component {
  catchAllUnhandledErrors = (reason, promise) => {
    alert("Some error occured");
    //console.error(promiseRejectionEvent);
  };
  componentDidMount() {
    this.props.initializeApp();
    // console.log(this.props);
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }
  componentWillUnmount() {
    window.removeEventListener(
      "unhandledrejection",
      this.catchAllUnhandledErrors
    );
  }
  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }

    return (
      <Layout>
        <HeaderContainer />
        <Content>
          <Layout>
            <Sider width={200}>
              <Menu
                mode="inline"
                style={{ height: "100%" }}
                theme="light"
              >
                <Menu.Item icon={<UserOutlined />} key="profilePage">
                  <Link to="/profile">Profile</Link>
                </Menu.Item>
                <Menu.Item icon={<MessageOutlined />} key="messagePage">
                  <Link to="/dialogs">Messages</Link>
                </Menu.Item>
                <Menu.Item icon={<LaptopOutlined />} key="developersPage">
                  <Link to="/users">Developers</Link>
                </Menu.Item>
                <Menu.Item icon={<QuestionOutlined /> } key="NotFoundPage">
                  <Link to="/Notfoundpage">Not Found Page</Link>
                </Menu.Item>
              </Menu>
            </Sider>
            <Content style={{paddingLeft:"20px",paddingTop:"20px",minHeight:"100vh"}}>
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => <Redirect to={"/login"} />}
                />
                <Route
                  path="/dialogs"
                  render={withSuspense(DialogsContainer)}
                />

                <Route
                  path="/profile/:userId?"
                  render={withSuspense(ProfileContainer)}
                />

                <Route path="/users" render={withSuspense(UsersContainer)} />

                <Route path="/login" render={() => <LoginAntd />} />

                <Route path="*" render={() => <NotFoundPage />} />
              </Switch>
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Social Network ©2020 Created by Artem Khairov
        </Footer>
      </Layout>
    );
  }
}

let mapStateToProps = (state) => ({
  initialized: state.app.initialized,
});

export default compose(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App);

