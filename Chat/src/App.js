import React, { useState, useEffect, useReducer } from "react";
import Join from "./Components/Join/Join";
import Intercourse from "./Components/Intercourse/Intercourse";
import reducer from "./Reducer";
import socket from "./Socket";
import axios from "axios";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./Components/globalStyles";
import { lightTheme, darkTheme } from "./Components/Theme";
import "./App.scss";

function App() {
  const [state, dispatch] = useReducer(reducer, {
    joined: false,
    roomId: null,
    userName: null,
    users: [],
    messages: [],
  });

  const [theme, setTheme] = useState("light");
  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

console.log(process.env)

  const onLogin = async (obj) => {
    dispatch({
      type: "JOINED",
      payload: obj,
    });

    socket.emit("ROOM:JOIN", obj);
    const { data } = await axios.get(`/rooms/${obj.roomId}`);

    dispatch({
      type: "SET_DATA",
      payload: data,
    });
  };

  const setUsers = (users) => {
    dispatch({
      type: "SET_USERS",
      payload: users,
    });
  };

  const addMessage = (message) => {
    dispatch({
      type: "NEW_MESSAGE",
      payload: message,
    });
  };

  useEffect(() => {
    socket.on("ROOM:SET_USERS", setUsers);
    socket.on("ROOM:NEW_MESSAGE", addMessage);
  }, []);

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <>
        <GlobalStyles />
        <div className="app">
          <button className="theme" onClick={themeToggler}>
            Switch Theme
          </button>
          {!state.joined ? (
            <Join onLogin={onLogin} />
          ) : (
            <Intercourse {...state} onAddMessage={addMessage} />
          )}
        </div>
      </>
    </ThemeProvider>
  );
}

export default App;
