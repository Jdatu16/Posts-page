import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { API_URL, FETCH_SUCESS, FETCH_ERROR } from "./Constants";
import { EditPost, Header, Posts, AddPost } from "./Components";
import { reducer } from "./store";

const initialState = {
  loading: true,
  error: "",
  post: {},
};

export const DispatchContext = React.createContext();
export const SetPostContext = React.createContext();
export const SetVisibleContext = React.createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [post, setPost] = useState({});
  const [visible, setVisible] = useState("start");
  const [addVisible, setAddVisible] = useState("start");
  const [addButtonHidden, setAddButtonHidden] = useState(true);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        dispatch({ type: FETCH_SUCESS, payload: response.data });
        setAddButtonHidden(false);
      })
      .catch((error) => {
        dispatch({ type: FETCH_ERROR });
      });
  }, []);

  return (
    <div className="main-container">
      <DispatchContext.Provider value={{ dispatch, setVisible, setPost }}>
        <Header />
        <Posts
          addButtonHidden={addButtonHidden}
          state={state}
          setAddVisible={setAddVisible}
        />
        <EditPost visible={visible} post={post} />
        <AddPost
          addVisible={addVisible}
          post={post}
          setAddVisible={setAddVisible}
        />
      </DispatchContext.Provider>
    </div>
  );
}

export default App;
