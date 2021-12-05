import { useContext } from "react";
import { DispatchContext } from "../../App";
import { POPUP_HIDE, EDIT_POST } from "../../Constants";
import "../../css/changePost.css";

export const EditPost = ({ visible, post }) => {
  const { dispatch, setVisible, setPost } = useContext(DispatchContext);

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch({
      type: EDIT_POST,
      payload: post,
    });
    setVisible(POPUP_HIDE);
    document.body.classList.remove("overflow-class");
    setPost({ title: "", body: "" });
  };

  const classGenerator = () => {
    if (visible === false) {
      return "open-popup edit-post-container";
    } else if (visible === true) {
      return "close-popup edit-post-container";
    } else if (visible === "start") {
      return "hidden-popup edit-post-container";
    }
  };
  return (
    <div className={classGenerator()}>
      <div className="flex-center">
        <form onSubmit={onSubmit} className="edit-post">
          <i
            className="close-icon fas fa-times"
            onClick={() => {
              setVisible(true);
              document.body.classList.remove("overflow-class");
              setPost({ title: "", body: "" });
            }}
          ></i>
          <div className="change-post-wrapper">
            <label className="change-post-title">TiTle</label>
            <textarea
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
              type="text"
              required
            />
          </div>
          <div className="change-post-wrapper">
            <label className="change-post-content">Content</label>
            <textarea
              className="content-textarea"
              onChange={(e) => {
                setPost({ ...post, body: e.target.value });
              }}
              value={post.body}
              type="text"
              required
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
