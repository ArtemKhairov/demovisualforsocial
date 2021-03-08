import { stopSubmit } from "redux-form";
import { profileAPI, usersAPI } from "../api/api";
import { ProfileType, PostType, PhotosType ,PostTypeAntd} from "../types/types";

const ADD_POST = "ADD-POST";
const DELETE_POST = "DELETE_POST";
// const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";
const ADD_COMMENT = "ADD_COMMENT";

let initialState = {
  posts: [
    { id: 1, message: "И снова седая ночь", likesCount: 12 },
    { id: 2, message: "И только ей доверяю я", likesCount: 11 },
    { id: 3, message: "Знаешь,седая ночь, ты все мои тайны", likesCount: 11 },
    { id: 4, message: "Но даже и ты...", likesCount: 11 },
  ] as Array<PostType>,
  comments: [
    {
      name: "UncleFlexxx",
      content: "Camry 3.5",
      imgSrc: "https://i.ytimg.com/vi/woWXFpcekRg/mqdefault.jpg",
    },
    {
      name: "Morandi",
      content: "Kalinka",
      imgSrc: "https://sefon.pro/img/artist_photos/morandi.jpg",
    },
    {
      name: "Niman Скриптонит",
      content: "Талия",
      imgSrc:
        "https://muzolenta.ru/wp-content/uploads/2018/10/2018-10-24-19.35.11-e1540391871131.jpg",
    },
    {
      name: "FREE FLOW FLAVA",
      content: "The final round",
      imgSrc:
        "https://st.rolld.ru/i/thumbnails/free-flow-flava-ekaterinburg-2020.jpeg",
    },
  ] as Array<PostTypeAntd>,
  profile: null as ProfileType | null,
  status: "",
  newPostText: "",
  newCommentText:"",
};

export type InitialStateType = typeof initialState;

const profileReducer = (
  state = initialState,
  action: any
): InitialStateType => {
  switch (action.type) {

    case ADD_COMMENT: {
      let newComment = {
        name: "UncleFlexxx",
        content: action.newCommentText,
        imgSrc:"https://i.ytimg.com/vi/woWXFpcekRg/mqdefault.jpg"
      }
      return {
        ...state,
        comments: [...state.comments, newComment],
        newCommentText:"",
      }
    }

    case ADD_POST: {
      let newPost = {
        id: 5,
        message: action.newPostText,
        likesCount: 0,
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
        newPostText: "",
      };
    }

    case DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter((p) => p.id !== action.postId),
      };
    }

    // case UPDATE_NEW_POST_TEXT: {
    //   return {
    //     ...state,
    //     newPostText: action.newText,
    //   };
    // }

    case SET_USER_PROFILE: {
      return {
        ...state,
        profile: action.profile,
      };
    }

    case SET_STATUS: {
      return {
        ...state,
        status: action.status,
      };
    }

    case SAVE_PHOTO_SUCCESS: {
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType,
      };
    }
      
    

    default:
      return state;
  }
};

type AddCommentActionCreatorType = {
  type: typeof ADD_COMMENT,
  newCommentText:string
}

export const addCommentActionCreator = (
  newCommentText: string
): AddCommentActionCreatorType => {
  return {
    type: ADD_COMMENT,
    newCommentText
  }
};

type AddPostActionCreatorType = {
  type: typeof ADD_POST;
  newPostText: string;
};

export const addPostActionCreator = (
  newPostText: string
): AddPostActionCreatorType => {
  return {
    type: ADD_POST,
    newPostText,
  };
};

type DeletePosActionCreatorType = {
  type: typeof DELETE_POST;
  postId: number;
};

export const deletePost = (postId: number): DeletePosActionCreatorType => {
  return {
    type: DELETE_POST,
    postId,
  };
};

// export const updateNewPostTextActionCreator = (text) => {
//   return {
//     type: UPDATE_NEW_POST_TEXT,
//     newText: text,
//   };
// };

type SetUserProfileActionCreatorType = {
  type: typeof SET_USER_PROFILE;
  profile: ProfileType;
};

export const setUserProfile = (
  profile: ProfileType
): SetUserProfileActionCreatorType => {
  return {
    type: SET_USER_PROFILE,
    profile: profile,
  };
};

type SetStatusActionCreatorType = {
  type: typeof SET_STATUS;
  status: string;
};

export const setStatus = (status: string): SetStatusActionCreatorType => {
  return {
    type: SET_STATUS,
    status: status,
  };
};

type SavePhotoSuccessActionCreatorType = {
  type: typeof SAVE_PHOTO_SUCCESS;
  photos: PhotosType;
};

export const savePhotoSuccess = (
  photos: PhotosType
): SavePhotoSuccessActionCreatorType => {
  return {
    type: SAVE_PHOTO_SUCCESS,
    photos,
  };
};



// thunk
export const getUserProfile = (userId: number) => async (dispatch: any) => {
  let response = await usersAPI.getProfile(userId);
  // console.log(response);
  dispatch(setUserProfile(response.data));
};

export const getStatus = (userId: number) => async (dispatch: any) => {
  let response = await profileAPI.getStatus(userId);
  dispatch(setStatus(response.data));
};

export const updateStatus = (status: string) => async (dispatch: any) => {
  try {
    let response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
      dispatch(setStatus(status));
    }
  } catch (error) {
    //
  }
};

export const savePhoto = (file: any) => async (dispatch: any) => {
  let response = await profileAPI.savePhoto(file);
  if (response.data.resultCode === 0) {
    dispatch(savePhotoSuccess(response.data.data.photos));
    console.log(response)
  } else {
    // return Promise.reject(response.data.messages[0]);
    console.log(response.data.messages)
    // return(response)
  }
};

export const saveProfile = (profile: ProfileType) => async (
  dispatch: any,
  getState: any
) => {
  const userId = getState().auth.userId;
  const response = await profileAPI.saveProfile(profile);

  if (response.data.resultCode === 0) {
    dispatch(getUserProfile(userId));
  } else {
    dispatch(stopSubmit("edit-profile", { _error: response.data.messages[0] }));
    return Promise.reject(response.data.messages[0]);
  }
};

export default profileReducer;
