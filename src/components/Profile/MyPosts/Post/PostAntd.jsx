import React from "react";
import { Comment, Avatar,Tooltip } from "antd";
import {
  DislikeOutlined,
  LikeOutlined,
} from "@ant-design/icons";

const actions = [
    <>
      <Tooltip>
        <LikeOutlined />
        <span style={{ paddingLeft: "8px" }}>5</span>
      </Tooltip>
      <Tooltip>
        <DislikeOutlined />
        <span style={{ paddingLeft: "8px" }}>2</span>
      </Tooltip>
    </>
];

const PostAntd = (props) => {
  // console.log(props)
  return (
    <Comment
      actions={actions}
      key={props.content}
      author={props.name}
      content={<p>{props.content}</p>}
      avatar={<Avatar src={props.imgSrc} alt={props.name} />}
    />
  );
};

export default PostAntd;
