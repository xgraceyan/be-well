import React, { useState } from "react";
import "./leftpane.css";
import Pet from "./Pet";
import WeekBar from "./WeekBar";
import ActionBar from "./ActionBar";
import grass from "../../../assets/grass.png";
import { usePetData } from "../../../UserData";
import ChatBubble from "./ChatBubble";

function LeftPane() {
  const petData = usePetData();
  const [chatMessage, setChatMessage] = useState(""); // State for chat bubble message
  const [temp, setTemp] = useState(false);

  return (
    <div id="left-pane" className="position-relative">
      <div className="container">
        <h1 className="title-container-sm">
          {petData?.username || "Loading..."}
        </h1>
        <WeekBar />
      </div>
      <ActionBar setChatMessage={setChatMessage} />{" "}
      {/* Pass handler to ActionBar */}
      <img src={grass} alt="" height="300px" className="grass-img" />
      <Pet />
      {chatMessage && <ChatBubble message={chatMessage} temp={temp} />}{" "}
      {/* Display chat bubble */}
    </div>
  );
}

export default LeftPane;
