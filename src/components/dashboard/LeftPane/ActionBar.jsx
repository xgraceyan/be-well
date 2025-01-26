import React, { useState } from "react";
import { usePetData } from "../../../UserData";

export default function ActionBar() {
  const petData = usePetData();
  const [count, setCount] = useState(0);

  const encouragingWords = [
    "Good luck! You’re going to do great.",
    "Break a leg! Go out there and wow them.",
    "You killed it! That was amazing.",
    "Congratulations, I’m so happy for you!",
    "You had the courage to follow your dreams.",
    "You stuck to your guns, good for you!",
    "Shine on!",
    "One step at a time, you’re almost there!",
    "Don’t worry, you can do this!",
    "Keep at it, you’ve got this!",
    "I have no doubt that you’ll be great at this.",
    "This is tough, but you’re definitely tougher.",
    "It sucks that you have to go through this, but I know you can do it.",
    "Things will get better, hang in there!",
    "Whatever the universe has in store for you is going to be amazing.",
    "Trust the process, it’ll work out.",
    "Good vibes coming your way.",
    "Sending you big hugs and happy thoughts.",
    "You’re in my thoughts today.",
    "I’m here for you no matter what.",
    "Your friendship is important to me.",
    "You have a heart of gold.",
    "You make the world a better place.",
  ];

  const sadWords = [
    "I feel blue.",
    "I’m down in the dumps.",
    "I have a heavy heart.",
    "I’m feeling out of sorts.",
    "I’m in a funk.",
    "I’m heartbroken.",
    "I’m downhearted.",
    "I’m grieving.",
    "I feel like I have a cloud hanging over me.",
    "I’m at a low ebb.",
    "I feel dispirited.",
  ];

  const handleChatClick = () => {
    // Increment count and wrap around the respective words array
    setCount((prevCount) => prevCount + 1);

    const words =
      petData?.mood > 2 ? encouragingWords : sadWords;

    // Compute the current message based on the updated count
    const message = words[count % words.length];
    console.log(message);
    return message;
  };

  return (
    <div id="action-bar" className="rounded px-5">
      <div
        className="btn-group d-flex justify-content-center align-items-end gap-5"
        role="group"
        aria-label="Basic outlined example"
      >
        <button
          type="button"
          className="action-btn btn btn-outline-secondary px-5 py-4"
        >
          <span className="fs-5">🐜</span> <br />
          Feed
        </button>
        <button
          type="button"
          className="action-btn btn btn-outline-secondary px-5 py-4"
        >
          <span className="fs-5">💊</span> <br />
          Meds
        </button>
        <button
          type="button"
          className="action-btn btn btn-outline-secondary px-5 py-4"
          onClick={handleChatClick}
        >
          <span className="fs-5">💬</span> <br />
          Chat
        </button>
      </div>
    </div>
  );
}
