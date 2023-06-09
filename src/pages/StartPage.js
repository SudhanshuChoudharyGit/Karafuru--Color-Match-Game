import React from 'react';
import './startpage.css';
import insimage from './insimage.png';
import fallingblocks from './fallingblocks.png';

const StartPage = ({ handleStartGame }) => {
  return (
    <div className="start-page">
      <h1 className="game-title">Karafuru</h1>
      <h2 className="game-sub-title">color matching game</h2>
      {/* <img src={fallingblocks} className="falling-blocks"/> */}
      <div className="instructions">
        <h2>How to Play</h2>
        
          <li>Click color which matches target</li>
          <li>Correct color gives 1 point</li>
          <li>Wrong color takes 1 live</li>
          <li>You get 3 lives and 12 seconds</li>
          <li>Use ⬉(mouse) or keyboard keys</li>
          <img src={insimage} className="insimages"/>
      </div>
      <div className="start-square-container" >
        <div className="start-square" onClick={handleStartGame}>
            <span className="start-square-front">Start Game</span>
          </div>
      </div> 
    </div>
  );
};

export default StartPage;
