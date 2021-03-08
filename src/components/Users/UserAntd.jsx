import React from "react";
import style from "./UsersAntd.module.css";
import { NavLink } from "react-router-dom";
import userPhoto from "../../assets/images/user.png";
import { List, Button } from "antd";
import SkeletonLoader from "../common/Preloader/Skeleton";

const UserAntd = ({
  users,
  followingInProgress,
  unfollow,
  follow,
  isFetching,
}) => {
  return (
    <>
      {isFetching ? (
        <SkeletonLoader />
      ) : (
        <List
          className="demo-loadmore-list"
          itemLayout="vertical"
          dataSource={users}
          renderItem={(u) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <img
                    style={{ marginLeft: "8px" }}
                    src={u.photos.small != null ? u.photos.small : userPhoto}
                    className={style.userPhoto}
                    alt="Ава пользователя"
                  />
                }
                title={
                  <NavLink to={"/profile/" + u.id}>
                    <div style={{ paddingTop: "20px" }}>{u.name}</div>
                  </NavLink>
                }
                description={
                  u.status != null ? (
                    u.status
                  ) : (
                    <span style={{ color: "black" }}>
                      У пользователя нет статуса
                    </span>
                  )
                }
              />
              {u.followed ? (
                <Button
                  style={{ marginLeft: "16px" }}
                  disabled={followingInProgress.some((id) => id === u.id)}
                  onClick={() => {
                    unfollow(u.id);
                  }}
                >
                  Unfollow
                </Button>
              ) : (
                <Button
                  style={{ marginLeft: "20px" }}
                  type="primary"
                  disabled={followingInProgress.some((id) => id === u.id)}
                  onClick={() => {
                    follow(u.id);
                  }}
                >
                  Follow
                </Button>
              )}
            </List.Item>
          )}
        />
      )}
    </>
  );
};

export default UserAntd;
