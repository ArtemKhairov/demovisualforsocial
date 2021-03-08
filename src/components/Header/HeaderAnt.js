import React from "react";
import { Link } from "react-router-dom";
import { Avatar, Button, Col, Layout,  Row } from "antd";
import { UserOutlined } from "@ant-design/icons";
import s from "./Header.module.css";

const HeaderAnt = (props) => {
  const { Header } = Layout;
  return (
    <Header className={s.header}>
      <Row>
        <Col span={18}>
        </Col>

        {props.isAuth ? (
          <>
            {" "}
            <Col span={1}>
              <Avatar
                alt={props.login || ""}
                style={{ backgroundColor: "#87d068" }}
                icon={<UserOutlined />}
              />
            </Col>
            <Col span={5}>
              <Button onClick={props.logout}>Log out</Button>
            </Col>
          </>
        ) : (
          <Col span={6}>
            <Button>
              <Link to={"/login"}>Login</Link>
            </Button>
          </Col>
        )}
      </Row>
    </Header>
  );
};

export default HeaderAnt;
