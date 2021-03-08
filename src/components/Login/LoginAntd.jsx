import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../redux/auth-reducer";
import Layout, { Content } from "antd/lib/layout/layout";
import { Form, Input, Button, Checkbox, Image } from "antd";
import { reduxForm } from "redux-form";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const LoginAntdForm = (props) => {

  console.log(props)

  const onFinish = (formData) => {
    // console.log(formData)
    props.login(formData.email, formData.password, formData.rememberMe,formData.captcha)
  };

  const onFinishFailed = (data) => {
    console.log("Failed:", data);
  };

  if (props.isAuth) {
    return <Redirect to={"/profile"} />;
  }

  return (
    <>
      <Layout>
        <Content
        // style={{ alignItems: "center", justifyContent: "center", display: "flex" }}
        >
          <Form
            style={{ paddingTop: "40px", maxWidth: "600px" }}
            // style={{marginLeft:"auto"}}
            {...layout}
            name="login"
            initialValues={{ rememberMe: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            
            <Form.Item
              label="Username"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            {props.captchaUrl && (
              <Form.Item {...tailLayout}>
                <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtrYhHfKv3h4ZFXbADe2mbyBIy2xQlughdjA&usqp=CAU" />
              </Form.Item>
            )}

            {props.captchaUrl && (
              <Form.Item label="captcha" name="captcha">
                <Input />
              </Form.Item>
            )}

            {props.error && <Form.Item {...tailLayout}>{props.error}</Form.Item>}

            <Form.Item
              {...tailLayout}
              name="rememberMe"
              valuePropName="checked"
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>

          </Form>
        </Content>
      </Layout>
    </>
  );
};



const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl,
})

let LoginReduxForm = reduxForm({
  form:"login"
})(LoginAntdForm)

export default connect(
  mapStateToProps,
  {login}
) (LoginReduxForm);
