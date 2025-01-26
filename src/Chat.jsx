import { usePetData } from "./UserData";

export function printMoodWords() {

    const petData = usePetData();

    const encouragingWords = ["Good luck! You’re going to do great.",
        "Break a leg! Go out there and wow them.", 
        "You killed it! That was amazing.", 
        "Congratulations, I’m so happy for you!",
        "You had the courage to follow your dreams.",
        "You stuck to your guns, good for you!", "Shine on!", 
        "One step at a time, you’re almost there!", 
        "Don’t worry, you can do this!", "Keep at it, you’ve got this!", 
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
        "You make the world a better place."]


    const sadWords = ["I feel blue.", "I’m down in the dumps.", 
        "I have a heavy heart.", "I’m feeling out of sorts.", "I’m in a funk.",
        "I’m heartbroken.", "I’m downhearted.", "I’m grieving.", 
        "I feel like I have a cloud hanging over me.", "I’m at a low ebb.",
        "I feel dispirited."]

    if (petData?.mood > 1) {
        return encouragingWords[Math.random(0, encouragingWords.length())]
    }
    else {
        return sadWords[Math.random(0, sadWords.length())]
    }

}

