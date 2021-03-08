import { Dispatch } from "react";
import { ThunkAction } from "redux-thunk";
import { ResultCodeEnum, usersAPI } from "../api/api";
import { UserType } from "../types/types";
import { updateObjectInArray } from "../utils/objectHelper";
import { AppStateType, InferActionsTypes } from "./redux-store";

let initialState = {
  users: [] as Array<UserType>,
  pageSize: 10 as number,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  // массив usersId
  followingInProgress: [] as Array<number>,
};

type InitialStateType = typeof initialState;

const usersReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case "FOLLOW": {
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: true,
        }),
      };
    }
    case "UNFOLLOW": {
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: false,
        }),
      };
    }
    case "SET_USERS": {
      return {
        ...state,
        users: action.users,
      };
    }
    case "SET_CURRENT_PAGE": {
      return {
        ...state,
        currentPage: action.currentPage,
      };
    }
    case "SET_TOTAL_USERS_COUNT": {
      return {
        ...state,
        totalUsersCount: action.count,
      };
    }
    case "TOGGLE_IS_FETCHING": {
      return {
        ...state,
        isFetching: action.isFetching,
      };
    }
    case "TOGGLE_IS_FOLLOWING_PROGRESS": {
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id !== action.userId),
      };
    }
    case "SET_PAGE_SIZE": {
      return {
        ...state,
        pageSize: action.pageSize,
      };
    }
    default:
      return state;
  }
};

export const actions = {
  followSuccess: (userId: number) => ({ type: "FOLLOW", userId } as const),
  unfollowSuccess: (userId: number) => ({ type: "UNFOLLOW", userId } as const),
  setUsers: (users: Array<UserType>) => ({ type: "SET_USERS", users } as const),
  setCurrentPage: (currentPage: number) =>
    ({ type: "SET_CURRENT_PAGE", currentPage } as const),
  setTotalUsersCount: (totalUsersCount: number) =>
    ({ type: "SET_TOTAL_USERS_COUNT", count: totalUsersCount } as const),
  toggleIsFetching: (isFetching: boolean) =>
    ({ type: "TOGGLE_IS_FETCHING", isFetching } as const),
  toggleIsFollowingProgress: (isFetching: boolean, userId: number) =>
    ({ type: "TOGGLE_IS_FOLLOWING_PROGRESS", isFetching, userId } as const),
  setPageSize: (pageSize: number) =>
    ({ type: "SET_PAGE_SIZE", pageSize } as const),
};

type ActionsTypes = InferActionsTypes<typeof actions>;

type DispatchType = Dispatch<ActionsTypes>;
type ThunkType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  ActionsTypes
>;

// thunkCreator
export const requestUsers = (
  page: number,
  pageSize: number
): ThunkType => async (dispatch) => {
  dispatch(actions.toggleIsFetching(true));
  dispatch(actions.setCurrentPage(page));
  let data = await usersAPI.getUsers(page, pageSize);
  dispatch(actions.toggleIsFetching(false));
  dispatch(actions.setUsers(data.items));
  dispatch(actions.setTotalUsersCount(data.totalCount));
};

const followUnfollowFlow = async (
  dispatch: DispatchType,
  userId: number,
  apiMethod: any,
  actionCreator: (userId: number) => ActionsTypes
) => {
  dispatch(actions.toggleIsFollowingProgress(true, userId));
  let response = await apiMethod(userId);
  if (response.data.resultCode === ResultCodeEnum.Success) {
    dispatch(actionCreator(userId));
  }
  dispatch(actions.toggleIsFollowingProgress(false, userId));
};

export const follow = (userId: number): ThunkType => async (dispatch) => {
  followUnfollowFlow(
    dispatch,
    userId,
    usersAPI.follow.bind(userId),
    actions.followSuccess
  );
};

export const unfollow = (userId: number): ThunkType => async (dispatch) => {
  followUnfollowFlow(
    dispatch,
    userId,
    usersAPI.follow.bind(userId),
    actions.unfollowSuccess
  );
};

export const changePageSize = (pageSize: number): ThunkType => async (
  dispatch
) => {
  dispatch(actions.setPageSize(pageSize));
};

export default usersReducer;
