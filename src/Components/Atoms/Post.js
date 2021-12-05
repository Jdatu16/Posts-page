import { useReducer, useContext } from "react";
import { DispatchContext } from "../../App";
import { DELETE_POST, POPUP_HIDE, POPUP_SHOW } from "../../Constants/Constants";
import { visibleReducer } from "../../store";

const initialState = true;

export const Post = ({ id, body, title }) => {
  const { dispatch, setPost, setVisible } = useContext(DispatchContext);

  const [popupStatus, setPopupStatus] = useReducer(
    visibleReducer,
    initialState
  );

  return (
    <article className="post-wrapper">
      <div className="post-top-part">
        <h3 className="post-title">{title}</h3>
        <div className="edit-icon-wrapper">
          <i
            onMouseOver={() => setPopupStatus({ type: POPUP_SHOW })}
            onMouseLeave={() => setPopupStatus({ type: POPUP_HIDE })}
            className="edit-icon fas fa-edit"
          >
            <div className="edit-popup" hidden={popupStatus}>
              <p
                onClick={(e) => {
                  setVisible(false);
                  document.body.classList.add("overflow-class");
                  setPost({ body: body, id: id, title: title });
                }}
              >
                Edit
              </p>
              <p
                onClick={() => {
                  console.log(id);
                  dispatch({
                    type: DELETE_POST,
                    payload: id,
                  });
                }}
              >
                Delete
              </p>
            </div>
          </i>
        </div>
      </div>
      <p className="post-content">{body}</p>
    </article>
  );
};
