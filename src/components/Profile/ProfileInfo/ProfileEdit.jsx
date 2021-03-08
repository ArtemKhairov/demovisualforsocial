import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { reduxForm } from "redux-form";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};


const ProfileDataForm = (props) => {
  // console.log(props)
  const onFinish = (formData) => {
    // console.log("Success:", values);
    props.onSubmit(formData);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {console.log(props)}
      <Button danger onClick={props.onCancel}>
        Cancel
      </Button>
      <Form
        {...layout}
        style={{ paddingTop: "40px", maxWidth: "600px" }}
        name="edit-profile"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          initialValue={props.profile.fullName}
          label="Full Name"
          name="fullName"
        >
          <Input />
        </Form.Item>

        <Form.Item
          initialValue={props.profile.aboutMe}
          label="About me"
          name="aboutMe"
        >
          <Input />
        </Form.Item>

        <Form.Item
          initialValue={props.profile.lookingForAJob}
          label="Looking for a job"
          name="lookingForAJob"
          valuePropName="checked"
        >
          <Checkbox />
        </Form.Item>

        <Form.Item
          initialValue={props.profile.lookingForAJobDescription}
          label="Professional skills"
          name="lookingForAJobDescription"
        >
          <Input />
        </Form.Item>

        <Form.Item label="Contacts" style={{ fontWeight: "bolder" }}>
          <Form.Item
            initialValue={props.profile.contacts.facebook}
            label="Facebook"
            name={["contacts", "facebook"]}
            style={{ display: "block", margin: "0" }}
          >
            <Input />
          </Form.Item>

          <Form.Item
            initialValue={props.profile.contacts.twitter}
            label="Twitter"
            name={["contacts", "twitter"]}
            style={{ display: "block", margin: "0" }}
          >
            <Input />
          </Form.Item>

          <Form.Item
            initialValue={props.profile.contacts.instagram}
            label="Instagram"
            name={["contacts", "instagram"]}
            style={{ display: "block", margin: "0" }}
          >
            <Input />
          </Form.Item>

          <Form.Item
            initialValue={props.profile.contacts.youtube}
            label="Youtube"
            name={["contacts", "youtube"]}
            style={{ display: "block", margin: "0" }}
          >
            <Input />
          </Form.Item>

          <Form.Item
            initialValue={props.profile.contacts.github}
            label="Github"
            name={["contacts", "github"]}
            style={{ display: "block", margin: "0" }}
          >
            <Input />
          </Form.Item>

          <Form.Item
            initialValue={props.profile.contacts.website}
            label="Website"
            name={["contacts", "website"]}
            style={{ display: "block", margin: "0" }}
          >
            <Input />
          </Form.Item>

          <Form.Item
            initialValue={props.profile.contacts.mainLink}
            label="Main Link"
            name={["contacts", "mainLink"]}
            style={{ display: "block", margin: "0" }}
          >
            <Input />
          </Form.Item>
        </Form.Item>

        <Form.Item {...tailLayout} name="rememberMe" valuePropName="checked">
          <Checkbox style={{ margin: "0" }}>Remember me</Checkbox>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

const ProfileDataReduxForm = reduxForm({
  form: "edit-profile",
})(ProfileDataForm);

export default ProfileDataReduxForm;
