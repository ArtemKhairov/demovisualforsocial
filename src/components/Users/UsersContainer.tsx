import React from "react";
import { connect } from "react-redux";
import {
  follow,
  unfollow,
  requestUsers,
  changePageSize
} from "../../redux/users-reducer";
// import Users from "./Users";
import UsersAntd from "./UsersAntd"
import { compose } from "redux";
import {
  getCurrentPage,
  getFollowingInProgress,
  getIsFetching,
  getPageSize,
  getTotalUsersCount,
  getUsers,
} from "../../redux/users-selectors";
import { UserType } from "../../types/types";
import { AppStateType } from "../../redux/redux-store";

type MapStatePropsType = {
  users: Array<UserType>;
  pageSize: number;
  currentPage: number;
  isFetching: boolean;
  totalUsersCount: number;
  followingInProgress: Array<number>;
};

type MapDispatchPropsType = {
  onChangePageSize: (pageSize: number) => void;
  getUsers: (currentPage: number, pageSize: number) => void;
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
};

type OwnPropsType = {
  pageTitle: string;
};

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

class UsersContainer extends React.Component<PropsType> {

  refreshUsers() {
    let pageSize: number | undefined = +this.props.pageSize;
    if (!pageSize) {
      console.error("Нет страниц")
    } else {
      const {currentPage}=this.props
      this.props.getUsers(currentPage,pageSize)
    }
  }

  componentDidMount() {
    const { currentPage, pageSize } = this.props;
    this.props.getUsers(currentPage, pageSize);
  }
  
  onPageChanged = (pageNumber: number) => {
    const { pageSize } = this.props;
    this.props.getUsers(pageNumber, pageSize);
  };
  
  componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
    if (this.props.pageSize !== prevProps.pageSize) {
        this.refreshUsers();
    }
  }

  render() {
    return (
      <>
        {/* {this.props.isFetching ? <Preloader /> : null} */}
        {/* <Users
          totalUsersCount={this.props.totalUsersCount}
          currentPage={this.props.currentPage}
          PS={this.props.PS}
          follow={this.props.follow}
          unfollow={this.props.unfollow}
          pageSize={this.props.pageSize}
          users={this.props.users}
          onPageChanged={this.onPageChanged}
          followingInProgress={this.props.followingInProgress}
        /> */}
        <UsersAntd
          isFetching={this.props.isFetching}
          totalUsersCount={this.props.totalUsersCount}
          currentPage={this.props.currentPage}
          onChangePageSize={this.props.onChangePageSize}
          follow={this.props.follow}
          unfollow={this.props.unfollow}
          pageSize={this.props.pageSize}
          users={this.props.users}
          onPageChanged={this.onPageChanged}
          followingInProgress={this.props.followingInProgress}
        />
      </>
    );
  }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  };
};

export default compose(
  // TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultRootState
  connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps,{follow,unfollow,getUsers: requestUsers,onChangePageSize:changePageSize})
  // withAuthRedirect
)(UsersContainer);
