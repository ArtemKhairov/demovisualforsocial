import React, { useState } from "react";
import { Layout, Row, Col, Image, Descriptions, Badge, Button } from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  GithubOutlined,
  GlobalOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import Preloader from "../../common/Preloader/Preloader";
import EditPhoto from "./EditPhoto";
import ProfileDataReduxForm from "./ProfileEdit";
import ProfileStatusAntd from "./ProfileStatusAntd";

const { Content } = Layout;

const ProfileInfoAntd = (props) => {
  let [editMode, setEditMode] = useState(false);

  const onSubmit = (formData) => {
     props.saveProfile(formData).then(
          () => {
              setEditMode(false);
          }
      );
    // console.log(formData);
  };

  if (!props.profile) {
    return <Preloader />;
  }
  return (
    <Layout>
      <Content>
        <Row>
          <Col span={6}>
            {!props.profile.photos.large ? (
              <Image src="https://fanfics.me/images/fandoms_heroes/739-1494189830.jpg" />
            ) : (
              <Image src={props.profile.photos.large} />
            )}

            {props.isOwner && <EditPhoto {...props} />}
          </Col>
          <Col span={6}>
            <div style={{ paddingTop: "40px", paddingLeft: "20px"}}>
              <h1 style={{ fontSize: "40px" }}>{props.profile.fullName}</h1>

              <ProfileStatusAntd  
                status={props.status}
                updateStatus={props.updateStatus}
              />

            </div>
          </Col>
        </Row>

        <div style={{marginTop:"20px"}}>
        {!editMode ? (
          <ProfileDescription
            isOwner={props.isOwner}
            profile={props.profile}
            goToEditMode={() => {
              setEditMode(true);
            }}
          />
        ) : (
          <ProfileDataReduxForm
            onSubmit={onSubmit}
            onCancel={() => setEditMode(false)}
            profile={props.profile}
          />
            )}
        </div>
      </Content>
    </Layout>
  );
};

export default ProfileInfoAntd;

// Описание профиля
const ProfileDescription = (props) => {
  return (
    <>
      {props.isOwner && <Button onClick={props.goToEditMode}>Edit</Button>}
      
      <Descriptions style={{ paddingTop: "15px" }} title="User Info" bordered column={2}>
        
        <Descriptions.Item labelStyle={{ fontWeight: "bolder" }} label="Name">
          {props.profile.fullName}
        </Descriptions.Item>

        <Descriptions.Item label="User ID">
          {props.profile.userId}
        </Descriptions.Item>

        <Descriptions.Item label="About me" span={24}>
          {props.profile.aboutMe}
        </Descriptions.Item>

        <Descriptions.Item label="Looking for a job" span={24}>
          {props.profile.lookingForAJob ? (
            <Badge status="processing" color="green" text="Yes" />
          ) : (
            <Badge status="processing" color="red" text="No" />
          )}
          <br />
        </Descriptions.Item>

        {props.profile.lookingForAJob && (
          <Descriptions.Item label="Professional skills" span={24}>
            React ,Redux , Node.js , Express , Mongodb
          </Descriptions.Item>
        )}

        <Descriptions.Item label="Contacts" span={24}>
          <FacebookOutlined />
          Facebook <a href={props.profile.contacts.facebook}>{props.profile.contacts.facebook}</a>
          <br />
          <TwitterOutlined />
          Твитер  <a href={props.profile.contacts.twitter}>{props.profile.contacts.twitter}</a>
          <br />
          <InstagramOutlined />
          Инстаграм <a href={props.profile.contacts.instagram}>{props.profile.contacts.instagram}</a>
          <br />
          <YoutubeOutlined />
          Youtube <a href={props.profile.contacts.youtube}>{props.profile.contacts.youtube}</a><br />
          <GithubOutlined /> Github <a href={props.profile.contacts.github}>{props.profile.contacts.github}</a> <br />
          <GlobalOutlined /> Website <a href={props.profile.contacts.website}>{props.profile.contacts.website}</a> <br />
          <MessageOutlined /> MainLink <a href={props.profile.contacts.mainLink}>{props.profile.contacts.mainLink}</a> <br />
        </Descriptions.Item>

      </Descriptions>
    </>
  );
};
