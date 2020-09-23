import React, { useState } from "react";
import axios from "axios";
import "./Join.scss";

function Join({ onLogin }) {
  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState("");
  const [isLoading, setLoading] = useState(false);

  async function onEnter() {
    if (!roomId || !userName) {
      return alert("Wrong data, inputs are required");
    }

    const obj = {
      roomId,
      userName,
    };

    setLoading(true);
    try {
      await axios.post("/rooms", obj);
      onLogin(obj);
    } catch (error) {
      console.log("Error", error);
    }
  }

  return (
    <div className="join">
      <h1>JOIN ROOM</h1>
      <input
        value={roomId}
        onChange={(event) => setRoomId(event.target.value)}
        placeholder="Room id"
      />
      <input
        value={userName}
        onChange={(event) => setUserName(event.target.value)}
        placeholder="Username"
      />
      <button disabled={isLoading} onClick={onEnter}>
        {isLoading ? "Join" : "Login"}
      </button>
    </div>
  );
}

export default Join;
