import { Post } from "./Atoms";

export const Posts = ({ state, setAddVisible, addButtonHidden }) => {
  return (
    <div className="container">
      <div className="add-post-container">
        <div
          hidden={addButtonHidden}
          onClick={() => {
            setAddVisible(false);
            document.body.classList.add("overflow-class");
          }}
          className="add-post-wraper"
        >
          <i class="fas fa-plus"> New Post</i>
        </div>
      </div>
      {state.loading
        ? "Loading ..."
        : state.post.map((post) => {
            const { title, body, id } = post;
            return <Post key={id} title={title} body={body} id={id} />;
          })}
      {state.error ? state.error : null}
    </div>
  );
};
