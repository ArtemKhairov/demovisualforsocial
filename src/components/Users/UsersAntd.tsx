import React, { FC } from "react";
import UserAntd from "./UserAntd";
import { UserType } from "../../types/types";
import PaginatorAntd from "../common/Paginator/PaginatorAntd";

type PropsType = {
  pageSize: number;
  currentPage: number;
  users: Array<UserType>;
  totalUsersCount: number;
  followingInProgress: Array<number>;
  isFetching:boolean,
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
  isFetching,
  onChangePageSize,
  ...props
}) => {
  return (
    <div>
      <PaginatorAntd
        currentPage={currentPage}
        onPageChanged={onPageChanged}
        totalItemsCount={totalUsersCount}
        pageSize={pageSize}
        onChangePageSize={onChangePageSize}
      />
      <UserAntd
        isFetching={isFetching}
        users={users}
        followingInProgress={props.followingInProgress}
        // key={u.id}
        unfollow={props.unfollow}
        follow={props.follow}
      />
    </div>
  );
};

export default Users;
