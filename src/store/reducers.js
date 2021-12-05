import {
  FETCH_SUCESS,
  FETCH_ERROR,
  DELETE_POST,
  EDIT_POST,
  ADD_POST,
  POPUP_SHOW,
  POPUP_HIDE,
} from "../Constants";

// app.js reducer and its functions

export const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_SUCESS:
      return {
        loading: false,
        post: action.payload,
        error: "",
      };
    case FETCH_ERROR:
      return {
        loading: false,
        post: {},
        error: "Something Went Wrong!",
      };
    case EDIT_POST:
      return {
        loading: false,
        post: funcEditPost(state, action.payload),
        error: "",
      };
    case DELETE_POST:
      return {
        loading: false,
        post: deletePost(state, action.payload),
        error: "",
      };
    case ADD_POST:
      return {
        loading: false,
        post: [action.payload, ...state.post],
        error: "",
      };
    default:
      return state;
  }
};

const funcEditPost = (ar, value) =>
  ar.post.map((singlePost) =>
    singlePost.id === value.id
      ? { ...singlePost, body: value.body, title: value.title }
      : singlePost
  );

const deletePost = (state, value) =>
  state.post.filter((post) => post.id !== value);

// popup window reducer ==> Post.js

export const visibleReducer = (popupStatus, action) => {
  switch (action.type) {
    case POPUP_SHOW:
      return false;
    case POPUP_HIDE:
      return true;
    default:
      return true;
  }
};
