import React from 'react';
import { Comment, Avatar, Form, Button, List, Input } from 'antd';
const { TextArea } = Input;

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={2} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </>
)

const DialogsAntd = (props) => {
  return (
    <>
      <Editor/>
    </>
  )
}

export default DialogsAntd
