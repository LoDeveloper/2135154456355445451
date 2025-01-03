import React, { useState } from "react";
import Game from "./components/Game.jsx";
import EndGame from "./components/EndGame.jsx";
import "./index.css";
import "./css/endgame.css";

const App = () => {
  const [difficulty, setDifficulty] = useState("easy");
  const [gameOver, setGameOver] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const handleGameOver = (score) => {
    setFinalScore(score);
    setGameOver(true); // Game over logic
  };

  const resetGame = () => {
    setGameOver(false);
    setFinalScore(0);
  };

  return (
    <div className="app">
      {!gameOver ? (
        <Game difficulty={difficulty} onGameOver={handleGameOver} />
      ) : (
        <EndGame score={finalScore} onRestart={resetGame} />
      )}
    </div>
  );
};

export default App;


//       <Settings difficulty={difficulty} setDifficulty={setDifficulty} />


// Game with dictionary implemented
/* import React, { useState } from "react";
import Game from "./components/Game";
import Settings from "./components/Settings";
import "./index.css";
import "./css/endgame.css";

const App = () => {
  const [difficulty, setDifficulty] = useState("medium");
  const [gameOver, setGameOver] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const handleGameOver = (score) => {
    setFinalScore(score);
    setGameOver(true);
  };

  const resetGame = () => {
    setGameOver(false);
    setFinalScore(0);
  };

  return (
    <div className="app">
      <Settings difficulty={difficulty} setDifficulty={setDifficulty} />
      {!gameOver ? (
        <Game difficulty={difficulty} onGameOver={handleGameOver} />
      ) : (
        <div className="container">
          <h1>Time's up!</h1>
          <p>Your final score is {finalScore}</p>
          <button onClick={resetGame}>Try Again!</button>
        </div>
      )}
    </div>
  );
};

export default App;
*/ 