import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import socket from "../../Socket";
import "./Intercourse.scss";

function Intercourse({ users, messages, userName, roomId, onAddMessage }) {
  const [messageValue, setMessageValue] = useState("");
  const messagesRef = useRef(null);

  function onSendMessage() {
    if (!messageValue.replace(/\s/g, "")) return false;
    socket.emit("ROOM:NEW_MESSAGE", {
      userName,
      roomId,
      text: messageValue,
    });
    onAddMessage({ userName, text: messageValue });
    setMessageValue("");
  }

  useEffect(() => {
    messagesRef.current.scrollTo(0, messagesRef.current.scrollHeight);
  }, [messages]);

  return (
    <div className="intercourse">
      <div className="users">
        <h1 className="room_name">Room: {roomId}</h1>
        <h1>Online ({users.length})</h1>
        <div>
          {users.map((name, index) => {
            return (
              <p key={index} className="username">
                {index + 1} : {name}
              </p>
            );
          })}
        </div>
      </div>
      <div className="message_container">
        <div ref={messagesRef} className="messages">
          {messages.map((message, index) => {
            return (
              <div className="message" key={index}>
                <div className="user">{message.userName}</div>
                <div className="text">{message.text}</div>
              </div>
            );
          })}
        </div>
        <div className="message_send">
          <textarea
            onKeyDown={(event) =>
              event.key === "Enter" ? onSendMessage() : false
            }
            value={messageValue}
            placeholder="Your message"
            onChange={(event) => setMessageValue(event.target.value)}
          ></textarea>
          <button onClick={onSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default Intercourse;
