import React, { useState } from "react";
import "./leftpane.css";
import Pet from "./Pet";
import WeekBar from "./WeekBar";
import ActionBar from "./ActionBar";
import grass from "../../../assets/grass.png";
import { usePetData } from "../../../UserData";
import ChatBubble from "./ChatBubble";
import MedsModal from "./MedsModal";

function LeftPane() {
  const petData = usePetData();
  const [chatMessage, setChatMessage] = useState(""); // State for chat bubble message
  const [temp, setTemp] = useState(false);

  const getEmojiFromMood = (mood) => {
    if (mood == 5) return "😆";
    if (mood == 4) return "😁";
    if (mood == 3) return "🙂";
    if (mood == 2) return "🙃";
    if (mood == 1) return "😢";
  };

  return (
    <div id="left-pane" className="position-relative">
      <div className="container">
        <h1 className="title-container-sm">
          {(petData &&
            petData?.username + "    " + getEmojiFromMood(petData?.mood)) ||
            "Loading..."}
        </h1>
        <MedsModal />
        <WeekBar />
      </div>
      <ActionBar setChatMessage={setChatMessage} setTemp={setTemp} />{" "}
      {/* Pass handler to ActionBar */}
      <img src={grass} alt="" height="300px" className="grass-img" />
      <Pet />
      {chatMessage && <ChatBubble message={chatMessage} temp={temp} />}{" "}
      {/* Display chat bubble */}
    </div>
  );
}

export default LeftPane;
