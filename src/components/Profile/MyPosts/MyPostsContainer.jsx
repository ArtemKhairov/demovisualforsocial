// import React from "react";
import { connect } from "react-redux";
import {
  // addPostActionCreator,
  addCommentActionCreator,
} from "../../../redux/profile-reducer";
// import MyPosts from "./MyPosts";
// import MyPostAntd from "./MyPostAntd";
import MyPostsMemorized from "./MyPostAntd";

let mapStateToProps = (state) => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText,
    comments: state.profilePage.comments,
    newCommentText: state.profilePage.newCommentText,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    // addPost: (newPostText) => {
    //   dispatch(addPostActionCreator(newPostText));
    // },
    addComment: (newCommentText) => {
      dispatch(addCommentActionCreator(newCommentText));
    },
  };
};

const MyPostsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPostsMemorized);

export default MyPostsContainer;
