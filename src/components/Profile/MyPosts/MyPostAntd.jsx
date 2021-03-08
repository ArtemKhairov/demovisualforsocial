import React from "react";
import PostAntd from "./Post/PostAntd";
import { reduxForm } from "redux-form";
import { Input, Form, Row, Col, Button } from "antd";

const Editor = (props) => {
  return (
    <>
      <Row>
        <Col span={8}>
          <Form name="formComment" onFinish={props.onSubmit}>
            <Form.Item
              name="newCommentText"
              rules={[
                {
                  required: true,
                  message: "Input something",
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit">Add Post</Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

const MyPostAntd = (props) => {
  let postsElements = props.comments.map((p) => (
    <PostAntd
      key={p.content}
      name={p.name}
      content={p.content}
      imgSrc={p.imgSrc}
    />
  ));

  let onAddComment = (formData) => {
    props.addComment(formData.newCommentText);
  };

  return (
    <>
      <h3>My Posts</h3>
      <EditorReduxForm onSubmit={onAddComment} />
      <div>{postsElements}</div>
    </>
  );
};

let EditorReduxForm = reduxForm({
  form: "comment",
})(Editor);

const MyPostsMemorized = React.memo(MyPostAntd);

export default MyPostsMemorized;
