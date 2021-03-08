import React, { FC } from "react";
import User from "./User";
// import Paginator from "../common/Paginator/Paginator";
import { UserType } from "../../types/types";
import PaginatorAntd from "../common/Paginator/PaginatorAntd";

type PropsType = {
  pageSize: number;
  currentPage: number;
  users: Array<UserType>;
  totalUsersCount: number;
  followingInProgress: Array<number>;
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
  onPageChanged: (pageNumber: number) => void;
  onChangePageSize: (pageSize: number) => void;
};

const Users: FC<PropsType> = ({
  currentPage,
  onPageChanged,
  totalUsersCount,
  pageSize,
  users,
  onChangePageSize,
  ...props
}) => {
  // console.log(props)
  return (
    <div>
      <PaginatorAntd
        currentPage={currentPage}
        onPageChanged={onPageChanged}
        totalItemsCount={totalUsersCount}
        pageSize={pageSize}
        onChangePageSize={onChangePageSize}
      />
      {users.map((u) => (
        <User
          u={u}
          followingInProgress={props.followingInProgress}
          key={u.id}
          unfollow={props.unfollow}
          follow={props.follow}
        />
      ))}
    </div>
  );
};

export default Users;
