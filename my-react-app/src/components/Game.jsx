import React, { useState, useEffect } from "react";

const fallbackWords = [
  "apple", "bridge", "cloud", "shadow", "river", "pizza", 
  "basket", "travel", "galaxy", "sunset", "gentle", "forest",
  "moments", "rainbow", "gamer", "computer"
];

const Game = ({ onGameOver }) => {
  const [currentWord, setCurrentWord] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10); // Start with 5 seconds for all levels
  const [difficulty, setDifficulty] = useState("easy");
  const [wordQueue, setWordQueue] = useState([]);
  const [usedWords, setUsedWords] = useState([]); // Track used words
  const [gameStarted, setGameStarted] = useState(false); // Track if the game has started

  useEffect(() => {
    prefetchWords(); // Prefetch words when the component mounts

    // Timer will start once the first word is displayed
    if (gameStarted) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            // Delay the call to onGameOver to avoid direct state update in render
            setTimeout(() => {
              onGameOver(score);
            }, 0);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer); // Cleanup timer on game over
    }
  }, [score, onGameOver, gameStarted]);

  // Function to fetch words from the API
  const prefetchWords = async () => {
    try {
      const response = await fetch("https://random-word-api.herokuapp.com/word?number=10");
      const data = await response.json();
      setWordQueue((prevQueue) => [...prevQueue, ...data]);
      if (!currentWord && data.length > 0) {
        setCurrentWord(data[0]); // Set the first word if not set
        setGameStarted(true); // Start the game once the first word is loaded
      }
    } catch (error) {
      console.error("Error prefetching words:", error);
      setWordQueue((prevQueue) => [...prevQueue, ...fallbackWords]);
      setGameStarted(true); // Start the game in case of error as well
    }
  };

  // Function to handle input changes and check for the correct word
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Convert both to lowercase for case-insensitive comparison
    if (value.toLowerCase() === currentWord.toLowerCase()) {
      setScore((prevScore) => prevScore + 1);
      setInputValue("");
      advanceToNextWord();
      addTime(); // Add time based on difficulty
    }
  };

  // Advances to the next word
  const advanceToNextWord = () => {
    // Add current word to usedWords and remove it from wordQueue
    setUsedWords((prevUsedWords) => [...prevUsedWords, currentWord]);

    setWordQueue((prevQueue) => {
      const nextQueue = [...prevQueue];
      nextQueue.shift(); // Remove the current word
      setCurrentWord(nextQueue[0]); // Set the next word
      return nextQueue;
    });

    // Fetch more words if the queue is low, ensuring no repeats
    if (wordQueue.length <= 3) {
      prefetchWords();
    }
  };

  // Adds time based on difficulty level
  const addTime = () => {
    if (difficulty === "hard") {
      setTimeLeft((prevTime) => prevTime + 1); // Add 3 seconds for hard
    } else if (difficulty === "medium") {
      setTimeLeft((prevTime) => prevTime + 3); // Add 6 seconds for medium
    } else {
      setTimeLeft((prevTime) => prevTime + 5); // Add 10 seconds for easy
    }
  };

  // Handle difficulty change
  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
  };

  return (
    <div>
      <div className="game-container">
        <h1 className="game-title">WORD BULLET</h1>
        <div className="settings">
          <label>Difficulty:</label>
          <select value={difficulty} onChange={handleDifficultyChange}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <p className="type-word">Type the following word:</p>
        <h2>{currentWord}</h2>
        <input
          type="text"
          placeholder="Type here..."
          value={inputValue}
          onChange={handleInputChange}
        />
        <div className="info">
          <p className="time-left">TIME LEFT: {timeLeft}s</p>
          <p className="score">Score: {score}</p>
        </div>
      </div>
      <footer>Game by Lorena Ojeda</footer>
    </div>
  );
};

export default Game;




/*
import React, { useState, useEffect } from "react";

const words = [
  "apple", "bridge", "cloud", "shadow", "river", "pizza", "basket", "travel", "galaxy", 
"sunset", "gentle", "forest", "mirror", "thunder", "breeze", "cactus", "ocean", "dragon", 
"butter", "zebra", "circus", "camera", "yellow", "wizard", "puzzle", "candle", "island", 
"mountain", "flame", "guitar", "violet", "parade", "castle", "emerald", "comet", "journey",  
"waterway", "railroad", "meadowlark", "skylight", "peach", "pumpkin", "poppy", "fig", 
"pineapple", "acorn", "violet", "tulip", "carnation", "magnolia", "ivy", "fern", "bamboo"

];

const Game = ({ difficulty, onGameOver }) => {
  const [currentWord, setCurrentWord] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    generateRandomWord();
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          onGameOver(score);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [score, onGameOver]);

  const generateRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    setCurrentWord(words[randomIndex]);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value === currentWord) {
      setScore((prevScore) => prevScore + 1);
      setInputValue("");
      generateRandomWord();
      addTime();
    }
  };

  const addTime = () => {
    if (difficulty === "hard") {
      setTimeLeft((prevTime) => prevTime + 3);
    } else if (difficulty === "medium") {
      setTimeLeft((prevTime) => prevTime + 6);
    } else {
      setTimeLeft((prevTime) => prevTime + 10);
    }
  };

  return (
    <div>
      <div className="game-container">
      <h1 className="game-title">WORD BULLET</h1>
        <div className="settings">
            <label>Difficulty:</label>
            <select className="difficulty" value={difficulty} onChange={handleDifficultyChange}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
            <p className="type-word">Type the following word:</p>
            <h2>{currentWord}</h2>
        <input
          type="text"
          placeholder="Type here..."
          value={inputValue}
          onChange={handleInputChange}
        />
        <div className="info">
          <p className="time-left">TIME LEFT: {timeLeft}s</p>
          <p className="score">Score: {score}</p>
        </div>
      </div>
      <footer>
          <p>Game by Lorena Ojeda</p>
      </footer>
    </div>
  );
};

export default Game;

*/

