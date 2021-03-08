import React from "react";
// import MyPostAntd from "./MyPosts/MyPostAntd";
// import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileInfoAntd from "./ProfileInfo/ProfileInfoAntd";

const Profile = (props) => {
  return (
    <div>
      {/* <ProfileInfo
        profile={props.profile}
        status={props.status}
        updateStatus={props.updateStatus}
        isOwner={props.isOwner}
        savePhoto={props.savePhoto}
        saveProfile={props.saveProfile}
      /> */}
      <ProfileInfoAntd 
        profile={props.profile}
        status={props.status}
        updateStatus={props.updateStatus}
        isOwner={props.isOwner}
        savePhoto={props.savePhoto}
        saveProfile={props.saveProfile}
      />
      <MyPostsContainer />
      {/* <MyPostAntd/> */}
    </div>
  );
};

export default Profile;
