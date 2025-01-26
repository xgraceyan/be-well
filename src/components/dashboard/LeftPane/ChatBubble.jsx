import React from "react";
import "./chatbubble.css";

function ChatBubble({ message, temp }) {
  return (
    <div className="chat-bubble-wrapper">
      {temp ? (
        <div className="chat-bubble temp-chat-bubble">
          <div className="bubble-content">{message}</div>
          <div className="bubble-arrow"></div>
        </div>
      ) : (
        <div className="chat-bubble">
          <div className="bubble-content">{message}</div>
          <div className="bubble-arrow"></div>
        </div>
      )}
    </div>
  );
}

export default ChatBubble;
