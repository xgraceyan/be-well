import React from "react";
import "./chatbubble.css";

function ChatBubble({ message }) {
  return (
    <div className="chat-bubble">
      <div className="bubble-content">{message}</div>
      <div className="bubble-arrow"></div>
    </div>
  );
}

export default ChatBubble;
