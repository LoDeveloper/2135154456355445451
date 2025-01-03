import React from "react";

const EndGame = ({ score, onRestart }) => {
  return (
    <div className="end-game-container">
      <div className="end-game-content">
        <h1 className="game-title">WORD BULLET</h1>
        <h1 className="game-over">Game Over!</h1>
        <p className="final-score">Final score: {score}</p>
        <button className="restart-btn" onClick={onRestart}>Restart</button>
      </div>
    </div>
  );
};

export default EndGame;
