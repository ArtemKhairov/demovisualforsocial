import React from "react";
import { NavLink } from "react-router-dom";
import { Result, Button } from "antd";

const NotFoundPage = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle={<p style={{color:"black"}}>Извините, страница которую вы ищите , не существует</p>}
      extra={
        <NavLink to={"/profile"}>
          <Button type="primary">Вернуться в профиль</Button>
        </NavLink>
      }
    />
  );
};

export default NotFoundPage;
