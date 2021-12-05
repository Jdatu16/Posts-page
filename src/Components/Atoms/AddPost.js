import { useContext, useState } from "react";
import { DispatchContext } from "../../App";
import { POPUP_HIDE, ADD_POST } from "../../Constants";
import "../../css/changePost.css";

export const AddPost = ({ addVisible, setAddVisible, post }) => {
  const { dispatch, setPost } = useContext(DispatchContext);

  const [idCount, setIdCount] = useState(101);

  const onSubmit = (event) => {
    event.preventDefault();
    if (post.title !== undefined) {
      dispatch({
        type: ADD_POST,
        payload: post,
      });
      setIdCount((prevcount) => prevcount + 1);
    }
    setAddVisible("add-class");
    document.body.classList.remove("overflow-class");
    setPost({ title: "", body: "" });
  };
  const classGenerator = () => {
    if (addVisible === false) {
      return "open-popup edit-post-container";
    } else if (addVisible === true) {
      return "close-popup edit-post-container";
    } else if (addVisible === "add-class") {
      return "close-add-popup edit-post-container";
    } else if (addVisible === "start") {
      return "hidden-popup edit-post-container";
    }
  };

  return (
    <div className={classGenerator()}>
      <div className="flex-center">
        <form autocomplete="off" onSubmit={onSubmit} className="edit-post">
          <i
            className="close-icon fas fa-times"
            onClick={() => {
              setAddVisible(true);
              document.body.classList.remove("overflow-class");
              setPost({ title: "", body: "" });
            }}
          ></i>
          <div className="change-post-wrapper">
            <label className="change-post-title">TiTle</label>
            <textarea
              placeholder="Please Enter Title"
              value={post.title}
              required
              onChange={(e) =>
                setPost({ ...post, title: e.target.value, id: idCount })
              }
              type="text"
            />
          </div>
          <div className="change-post-wrapper">
            <label className="change-post-content">Content</label>
            <textarea
              className="content-textarea"
              placeholder="What Do You Want To Post?"
              value={post.body}
              required
              onChange={(e) => {
                setPost({ ...post, body: e.target.value });
              }}
              type="text"
            />
          </div>

          <button className="submit-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
