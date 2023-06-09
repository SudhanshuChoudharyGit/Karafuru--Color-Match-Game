
/*

import React, { useState, useEffect } from 'react';
import './ColorMatcher.css';
import correctSound from './sounds/correct.mp3';
import wrongSound from './sounds/wrong.mp3';
import startSound from './sounds/start.mp3';
import endSound from './sounds/end.mp3';
import restartSound from './sounds/restart.mp3';
import avatar1 from './avatars/avatar1.png';
import avatar2 from './avatars/avatar2.png';
import avatar3 from './avatars/avatar3.png';
import avatar4 from './avatars/avatar4.png';

const avatars = [avatar1, avatar2, avatar3, avatar4];
const colorOptions = ['red', 'blue', 'green', 'yellow'];

const App = () => {
  const [targetColor, setTargetColor] = useState('');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [time, setTime] = useState(12);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [selectedName, setSelectedName] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const storedLeaderboard = JSON.parse(localStorage.getItem('leaderboard'));
    if (storedLeaderboard) {
      setLeaderboard(storedLeaderboard);
    }
  }, []);

  useEffect(() => {
    if (gameOver) {
      const newScore = { name: selectedName, avatar: selectedAvatar, score };
      const newLeaderboard = [...leaderboard, newScore].sort((a, b) => b.score - a.score).slice(0, 10);
      setLeaderboard(newLeaderboard);
      localStorage.setItem('leaderboard', JSON.stringify(newLeaderboard));
    }
  }, [gameOver]);

  useEffect(() => {
    if (gameStarted && time > 0) {
      const timer = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (time === 0 && !gameOver) {
      setGameOver(true);
      new Audio(endSound).play();
    }
  }, [gameStarted, time, gameOver]);

  const startGame = () => {
    setScore(0);
    setLives(3);
    setTime(12);
    setGameStarted(true);
    setGameOver(false);
    setTargetColor(colorOptions[Math.floor(Math.random() * colorOptions.length)]);
    new Audio(startSound).play();
  };

  const restartGame = () => {
    setScore(0);
    setLives(3);
    setTime(12);
    setGameStarted(true);
    setGameOver(false);
    setTargetColor(colorOptions[Math.floor(Math.random() * colorOptions.length)]);
    new Audio(restartSound).play();
  };

  const handleSquareClick = (color) => {
    if (color === targetColor) {
      setScore(score + 1);
      setTargetColor(colorOptions[Math.floor(Math.random() * colorOptions.length)]);
      new Audio(correctSound).play();
    } else {
      setLives(lives - 1);
      new Audio(wrongSound).play();
    }
  };

  const handleAvatarClick = (avatar) => {
    setSelectedAvatar(avatar);
  };

  const handleNameChange = (event) => {
    setSelectedName(event.target.value);
  };

  return (
    <div className={`container ${gameOver ? 'game-over' : ''}`}>
      {!gameStarted ? (
        <div className="avatar-selection">
          <h2>Select your avatar and enter your name</h2>
          <div className="avatar-container">
            {avatars.map((avatar, index) => (
              <img
                key={index}
                src={avatar}
                alt={`Avatar ${index + 1}`}
                className={`avatar ${selectedAvatar === avatar ? 'selected' : ''}`}
                onClick={() => handleAvatarClick(avatar)}
              />
            ))}
          </div>
          <input type="text" value={selectedName} onChange={handleNameChange} placeholder="Enter your name" />
          <button className="button" onClick={startGame} disabled={!selectedName || !selectedAvatar}>
            Start
          </button>
        </div>
      ) : (
        <>
          <div className="score-container">
            <h2>Score: {score}</h2>
            <p>Lives: {lives}</p>
            <p>Time: {time}</p>
          </div>
          <div className="player-info">
            <img src={selectedAvatar} alt={`Avatar of ${selectedName}`} className="player-avatar" />
            <span className="player-name">{selectedName}</span>
          </div>
          <div className="target-color" style={{ backgroundColor: targetColor }}></div>
          <div className="square-container">
            {colorOptions.map((color, index) => (
              <div
                key={index}
                className={`square ${lives === 1 ? 'shake' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => handleSquareClick(color)}
              ></div>
            ))}
          </div>
          <div className="leaderboard">
            <h2>Leaderboard</h2>
            <ul>
              {leaderboard.map((score, index) => (
                <li key={index}>
                  <img src={score.avatar} alt={`Avatar of ${score.name}`} />
                  <span>{score.name}</span>
                  <span>{score.score}</span>
                </li>
              ))}
            </ul>
          </div>
          {gameOver && (
            <div className="game-over-screen">
              <div className="game-over">
                <h2>Game Over</h2>
                <p>Your score: {score}</p>
                <button className="button" onClick={restartGame}>
                  Restart
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;*/




/*
import React, { useState, useEffect } from 'react';
import './ColorMatcher.css';
import correctSound from './sounds/correct.mp3';
import wrongSound from './sounds/wrong.mp3';
import startSound from './sounds/start.mp3';
import endSound from './sounds/end.mp3';
import restartSound from './sounds/restart.mp3';
import avatar1 from './avatars/avatar1.png';
import avatar2 from './avatars/avatar2.png';
import avatar3 from './avatars/avatar3.png';
import avatar4 from './avatars/avatar4.png';

const avatars = [avatar1, avatar2, avatar3, avatar4];
const colorOptions = ['red', 'blue', 'green', 'yellow'];

const App = () => {
  const [targetColor, setTargetColor] = useState('');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [time, setTime] = useState(12);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [selectedName, setSelectedName] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const storedLeaderboard = JSON.parse(localStorage.getItem('leaderboard'));
    if (storedLeaderboard) {
      setLeaderboard(storedLeaderboard);
    }
  }, []);

  useEffect(() => {
    if (gameOver) {
      const newScore = { name: selectedName, avatar: selectedAvatar, score };
      const newLeaderboard = [...leaderboard, newScore].sort((a, b) => b.score - a.score).slice(0, 10);
      setLeaderboard(newLeaderboard);
      localStorage.setItem('leaderboard', JSON.stringify(newLeaderboard));
    }
  }, [gameOver]);

  useEffect(() => {
    let timer;
    if (gameStarted && time > 0) {
      timer = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (time === 0 || lives === 0) {
      setGameOver(true);
      new Audio(endSound).play();
    }
    return () => clearTimeout(timer);
  }, [gameStarted, time, lives]);

  const startGame = () => {
    setScore(0);
    setLives(3);
    setTime(12);
    setGameStarted(true);
    setGameOver(false);
    setTargetColor(colorOptions[Math.floor(Math.random() * colorOptions.length)]);
    new Audio(startSound).play();
  };

  const restartGame = () => {
    setScore(0);
    setLives(3);
    setTime(12);
    setGameStarted(true);
    setGameOver(false);
    setTargetColor(colorOptions[Math.floor(Math.random() * colorOptions.length)]);
    new Audio(restartSound).play();
  };

  const handleSquareClick = (color) => {
    if (color === targetColor) {
      setScore(score + 1);
      setTargetColor(colorOptions[Math.floor(Math.random() * colorOptions.length)]);
      new Audio(correctSound).play();
    } else {
      setLives(lives - 1);
      new Audio(wrongSound).play();
    }
  };

  const handleAvatarClick = (avatar) => {
    setSelectedAvatar(avatar);
  };

  const handleNameChange = (event) => {
    setSelectedName(event.target.value);
  };

  return (
    <div className={`container ${gameOver ? 'game-over' : ''}`}>
      {!gameStarted ? (
        <div className="avatar-selection">
          <h2>Select your avatar and enter your name</h2>
          <div className="avatar-container">
            {avatars.map((avatar, index) => (
              <img
                key={index}
                src={avatar}
                alt={`Avatar ${index + 1}`}
                className={`avatar ${selectedAvatar === avatar ? 'selected' : ''}`}
                onClick={() => handleAvatarClick(avatar)}
              />
            ))}
          </div>
          <input type="text" value={selectedName} onChange={handleNameChange} placeholder="Enter your name" />
          <button className="button" onClick={startGame} disabled={!selectedName || !selectedAvatar}>
            Start
          </button>
        </div>
      ) : (
        <>
          <div className="score-container">
            <h2>Score: {score}</h2>
            <p>Lives: {lives}</p>
            <p>Time: {time}</p>
          </div>
          <div className="player-info">
            <img src={selectedAvatar} alt={`Avatar of ${selectedName}`} className="player-avatar" />
            <span className="player-name">{selectedName}</span>
          </div>
          <div className="target-color" style={{ backgroundColor: targetColor }}></div>
          <div className="square-container">
            {colorOptions.map((color, index) => (
              <div
                key={index}
                className={`square ${lives === 1 ? 'shake' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => handleSquareClick(color)}
              ></div>
            ))}
          </div>
          <div className="leaderboard">
            <h2>Leaderboard</h2>
            <ul>
              {leaderboard.map((score, index) => (
                <li key={index}>
                  <img src={score.avatar} alt={`Avatar of ${score.name}`} />
                  <span>{score.name}</span>
                  <span>{score.score}</span>
                </li>
              ))}
            </ul>
          </div>
          {gameOver && (
            <div className="game-over-screen">
              <div className="game-over">
                <h2>Game Over</h2>
                <p>Your score: {score}</p>
                <button className="button" onClick={restartGame}>
                  Restart
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;

*/

/*

import React, { useState, useEffect } from 'react';
import './ColorMatcher.css';
import correctSound from './sounds/correct.mp3';
import wrongSound from './sounds/wrong.mp3';
import startSound from './sounds/start.mp3';
import endSound from './sounds/end.mp3';
import restartSound from './sounds/restart.mp3';
import avatar1 from './avatars/avatar1.png';
import avatar2 from './avatars/avatar2.png';
import avatar3 from './avatars/avatar3.png';
import avatar4 from './avatars/avatar4.png';

const avatars = [avatar1, avatar2, avatar3, avatar4];
const colorOptions = ['red', 'blue', 'green', 'yellow'];

const App = () => {
  const [targetColor, setTargetColor] = useState('');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [time, setTime] = useState(12);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [selectedName, setSelectedName] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const storedLeaderboard = JSON.parse(localStorage.getItem('leaderboard'));
    if (storedLeaderboard) {
      setLeaderboard(storedLeaderboard);
    }
  }, []);

  useEffect(() => {
    if (gameOver) {
      const newScore = { name: selectedName, avatar: selectedAvatar, score };
      const newLeaderboard = [...leaderboard, newScore].sort((a, b) => b.score - a.score).slice(0, 10);
      setLeaderboard(newLeaderboard);
      localStorage.setItem('leaderboard', JSON.stringify(newLeaderboard));
    }
  }, [gameOver]);

  useEffect(() => {
    if (gameStarted && time > 0) {
      const timer = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (time === 0 || lives === 0) {
      setGameOver(true);
      new Audio(endSound).play();
    }
  }, [gameStarted, time, lives]);

  const startGame = () => {
    setScore(0);
    setLives(3);
    setTime(12);
    setGameStarted(true);
    setGameOver(false);
    setTargetColor(colorOptions[Math.floor(Math.random() * colorOptions.length)]);
    new Audio(startSound).play();
  };

  const restartGame = () => {
    setScore(0);
    setLives(3);
    setTime(12);
    setGameStarted(true);
    setGameOver(false);
    setTargetColor(colorOptions[Math.floor(Math.random() * colorOptions.length)]);
    new Audio(restartSound).play();
  };

  const handleSquareClick = (color) => {
    if (color === targetColor) {
      setScore(score + 1);
      setTargetColor(colorOptions[Math.floor(Math.random() * colorOptions.length)]);
      setTime(time - 1);
      new Audio(correctSound).play();
    } else {
      setLives(lives - 1);
      new Audio(wrongSound).play();
    }
  };

  const handleAvatarClick = (avatar) => {
    setSelectedAvatar(avatar);
  };

  const handleNameChange = (event) => {
    setSelectedName(event.target.value);
  };

  return (
    <div className={`container ${gameOver ? 'game-over' : ''}`}>
      {!gameStarted ? (
        <div className="avatar-selection">
          <h2>Select your avatar and enter your name</h2>
          <div className="avatar-container">
            {avatars.map((avatar, index) => (
              <img
                key={index}
                src={avatar}
                alt={`Avatar ${index + 1}`}
                className={`avatar ${selectedAvatar === avatar ? 'selected' : ''}`}
                onClick={() => handleAvatarClick(avatar)}
              />
            ))}
          </div>
          <input type="text" value={selectedName} onChange={handleNameChange} placeholder="Enter your name" />
          <button className="button" onClick={startGame} disabled={!selectedName || !selectedAvatar}>
            Start
          </button>
        </div>
      ) : (
        <>
          <div className="score-container">
            <h2>Score: {score}</h2>
            <p>Lives: {lives}</p>
            <p>Time: {time}</p>
          </div>
          <div className="player-info">
            <img src={selectedAvatar} alt={`Avatar of ${selectedName}`} className={`player-avatar ${selectedAvatar ? 'selected' : ''}`} />
            <span className="player-name">{selectedName}</span>
          </div>
          <div className="target-color" style={{ backgroundColor: targetColor }}></div>
          <div className="square-container">
            {colorOptions.map((color, index) => (
              <div
                key={index}
                className={`square ${lives === 1 ? 'shake' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => handleSquareClick(color)}
              ></div>
            ))}
          </div>
          <div className="leaderboard">
            <h2>Leaderboard</h2>
            <ul>
              {leaderboard.map((score, index) => (
                <li key={index}>
                  <img src={score.avatar} alt={`Avatar of ${score.name}`} />
                  <span>{score.name}</span>
                  <span>{score.score}</span>
                </li>
              ))}
            </ul>
          </div>
          {gameOver && (
            <div className="game-over-screen">
              <div className="game-over">
                <h2>Game Over</h2>
                <p>Your score: {score}</p>
                <button className="button" onClick={restartGame}>
                  Restart
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;

*/










/*


import React, { useState, useEffect } from 'react';
import './ColorMatcher.css';
import correctSound from './sounds/correct.mp3';
import wrongSound from './sounds/wrong.mp3';
import startSound from './sounds/start.mp3';
import endSound from './sounds/end.mp3';
import restartSound from './sounds/restart.mp3';
import avatar1 from './avatars/avatar1.png';
import avatar2 from './avatars/avatar2.png';
import avatar3 from './avatars/avatar3.png';
import avatar4 from './avatars/avatar4.png';

const avatars = [avatar1, avatar2, avatar3, avatar4];
const colorOptions = ['red', 'blue', 'green', 'yellow'];

const App = () => {
  const [targetColor, setTargetColor] = useState('');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [time, setTime] = useState(12);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [selectedName, setSelectedName] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const storedLeaderboard = JSON.parse(localStorage.getItem('leaderboard'));
    if (storedLeaderboard) {
      setLeaderboard(storedLeaderboard);
    }
  }, []);

  useEffect(() => {
    if (gameOver) {
      const newScore = { name: selectedName, avatar: selectedAvatar, score };
      const newLeaderboard = [...leaderboard, newScore].sort((a, b) => b.score - a.score).slice(0, 10);
      setLeaderboard(newLeaderboard);
      localStorage.setItem('leaderboard', JSON.stringify(newLeaderboard));
    }
  }, [gameOver]);

  useEffect(() => {
    if (gameStarted && time > 0) {
      const timer = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (time === 0 || lives === 0) {
      setGameOver(true);
      new Audio(endSound).play();
    }
  }, [gameStarted, time, lives]);

  const startGame = () => {
    setScore(0);
    setLives(3);
    setTime(12);
    setGameStarted(true);
    setGameOver(false);
    setTargetColor(colorOptions[Math.floor(Math.random() * colorOptions.length)]);
    new Audio(startSound).play();
  };

  const restartGame = () => {
    setScore(0);
    setLives(3);
    setTime(12);
    setGameStarted(true);
    setGameOver(false);
    setTargetColor(colorOptions[Math.floor(Math.random() * colorOptions.length)]);
    new Audio(restartSound).play();
  };

  const handleSquareClick = (color) => {
    if (color === targetColor) {
      setScore(score + 1);
      setTargetColor(colorOptions[Math.floor(Math.random() * colorOptions.length)]);
      setTime(time - 1);
      new Audio(correctSound).play();
    } else {
      setLives(lives - 1);
      new Audio(wrongSound).play();
    }
  };

  const handleAvatarClick = (avatar) => {
    setSelectedAvatar(avatar);
  };

  const handleNameChange = (event) => {
    setSelectedName(event.target.value);
  };

  return (
    <div className="container">
      {!gameStarted ? (
        <div className="avatar-selection">
          <h2>Select your avatar and enter your name</h2>
          <div className="avatar-container">
            {avatars.map((avatar, index) => (
              <img
                key={index}
                src={avatar}
                alt={`Avatar ${index + 1}`}
                className={`avatar ${selectedAvatar === avatar ? 'selected' : ''}`}
                onClick={() => handleAvatarClick(avatar)}
              />
            ))}
          </div>
          <input type="text" value={selectedName} onChange={handleNameChange} placeholder="Enter your name" />
          <button className="button" onClick={startGame} disabled={!selectedName || !selectedAvatar}>
            Start
          </button>
        </div>
      ) : (
        <>
          <div className="score-container">
            <h2>Score: {score}</h2>
            <p>Lives: {lives}</p>
            <p>Time: {time}</p>
          </div>
          <div className="player-info">
            <img src={selectedAvatar} alt={`Avatar of ${selectedName}`} className="player-avatar" />
            <span className="player-name">{selectedName}</span>
          </div>
          <div className="target-color" style={{ backgroundColor: targetColor }}></div>
          <div className="square-container">
            {colorOptions.map((color, index) => (
              <div
                key={index}
                className={`square ${lives === 1 ? 'shake' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => handleSquareClick(color)}
              ></div>
            ))}
          </div>
          <div className="leaderboard">
            <h2>Leaderboard</h2>
            <ul>
              {leaderboard.map((score, index) => (
                <li key={index}>
                  <img src={score.avatar} alt={`Avatar of ${score.name}`} />
                  <span>{score.name}</span>
                  <span>{score.score}</span>
                </li>
              ))}
            </ul>
          </div>
          {gameOver && (
            <div className="game-over">
              <h2>Game Over</h2>
              <p>Your score: {score}</p>
              <button className="button" onClick={restartGame}>
                Restart
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;

*/







/*

import React, { useState, useEffect } from 'react';
import './ColorMatcher.css';
import correctSound from './sounds/correct.mp3';
import wrongSound from './sounds/wrong.mp3';
import startSound from './sounds/start.mp3';
import endSound from './sounds/end.mp3';
import restartSound from './sounds/restart.mp3';

const App = () => {
  const [targetColor, setTargetColor] = useState('');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [time, setTime] = useState(10);
  const [gameOver, setGameOver] = useState(false);
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    const storedAvatar = localStorage.getItem('avatar');
    if (storedName && storedAvatar) {
      setName(storedName);
      setAvatar(storedAvatar);
    }
  }, []);

  useEffect(() => {
    playSound(startSound);
    generateTargetColor();
  }, []);

  useEffect(() => {
    if (time === 0) {
      endGame();
    }
  }, [time]);

  const generateTargetColor = () => {
    const colors = ['red', 'blue', 'green', 'yellow'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setTargetColor(randomColor);
  };

  const handleSquareClick = (clickedColor) => {
    if (clickedColor === targetColor) {
      setScore(score + 1);
      generateTargetColor();
      playSound(correctSound);
    } else {
      setLives(lives - 1);
      if (lives === 1) {
        endGame();
      }
      shakeSquares();
      playSound(wrongSound);
    }
  };

  const endGame = () => {
    setGameOver(true);
    playSound(endSound);
    updateLeaderboard();
  };

  const restartGame = () => {
    setScore(0);
    setLives(3);
    setTime(10);
    setGameOver(false);
    generateTargetColor();
    playSound(restartSound);
  };

  useEffect(() => {
    let countdownTimer = null;
    if (!gameOver) {
      countdownTimer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => clearInterval(countdownTimer);
  }, [gameOver]);

  const playSound = (sound) => {
    const audio = new Audio(sound);
    const playPromise = audio.play();
    if (Promise !== undefined) {
      playPromise.then(() => {
        // Audio started playing
      }).catch((error) => {
        // Audio failed to play
        console.log(error);
      });
    }
  };

  const shakeSquares = () => {
    const squares = document.querySelectorAll('.square');
    squares.forEach((square) => {
      square.classList.add('shake');
      setTimeout(() => {
        square.classList.remove('shake');
      }, 500);
    });
  };

  const handleKeyDown = (event) => {
    switch (event.key) {
      case '1':
        handleSquareClick('red');
        break;
      case '2':
        handleSquareClick('blue');
        break;
      case '3':
        handleSquareClick('green');
        break;
      case '4':
        handleSquareClick('yellow');
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAvatarChange = (event) => {
    setAvatar(event.target.value);
  };

  const handleStartGame = () => {
    localStorage.setItem('name', name);
    localStorage.setItem('avatar', avatar);
  };

  const updateLeaderboard = () => {
    const player = { name, avatar, score };
    const storedLeaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    const updatedLeaderboard = [...storedLeaderboard, player].sort((a, b) => b.score - a.score).slice(0, 10);
    setLeaderboard(updatedLeaderboard);
    localStorage.setItem('leaderboard', JSON.stringify(updatedLeaderboard));
  };

  useEffect(() => {
    const storedLeaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    setLeaderboard(storedLeaderboard);
  }, []);

  useEffect(() => {
    if (gameOver) {
      const popupTimer = setTimeout(() => {
        const popup = document.createElement('div');
        popup.classList.add('score-popup');
        popup.innerHTML = `
          <h2>Game Over</h2>
          <p>Final Score: ${score}</p>
          <button class="button restart-button" onClick=${restartGame}>Restart</button>
        `;
        document.body.appendChild(popup);
      }, 500);
      return () => clearTimeout(popupTimer);
    }
  }, [gameOver, score]);

  return (
    <div className="container">
      {name && avatar ? (
        <>
          <div className="score-container">
            <h2>Color Matcher</h2>
            <p>Score: {score}</p>
          </div>
          {gameOver ? (
            <div className="game-over">
              <h2>Game Over</h2>
              <p>Final Score: {score}</p>
              <button className="button restart-button" onClick={restartGame}>
                Restart
              </button>
              <div className="leaderboard">
                <h2>Leaderboard</h2>
                <ol>
                  {leaderboard.map((player, index) => (
                    <li key={index}>
                      <img src={player.avatar} alt={player.name} />
                      <span>{player.name}</span>
                      <span>{player.score}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          ) : (
            <div>
              <div
                className="target-color"
                style={{ backgroundColor: targetColor }}
              ></div>
              <p>Target Color</p>
              <p>Lives: {lives}</p>
              <p>Time Left: {time}</p>
              <div className="square-container">
                <button
                  className={`square red`}
                  onClick={() => handleSquareClick('red')}
                >
                  Red
                </button>
                <button
                  className={`square blue`}
                  onClick={() => handleSquareClick('blue')}
                >
                  Blue
                </button>
                <button
                  className={`square green`}
                  onClick={() => handleSquareClick('green')}
                >
                  Green
                </button>
                <button
                  className={`square yellow`}
                  onClick={() => handleSquareClick('yellow')}
                >
                  Yellow
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="start-container">
          <h2>Welcome to Color Matcher!</h2>
          <p>Please enter your name and choose an avatar to start the game.</p>
          <div className="form-container">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={handleNameChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="avatar">Avatar:</label>
              <select id="avatar" value={avatar} onChange={handleAvatarChange}>
                <option value="">Choose an avatar</option>
                <option value="https://i.imgur.com/1A6Gv1d.png">😀</option>
                <option value="https://i.imgur.com/5JQJmJG.png">😎</option>
                <option value="https://i.imgur.com/5JQJmJG.png">🤖</option>
                <option value="https://i.imgur.com/5JQJmJG.png">🐱</option>
              </select>
            </div>
            <button className="button start-button" onClick={handleStartGame}>
              Start Game
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

*/




/*




import React, { useState, useEffect } from 'react';
import './ColorMatcher.css';
import correctSound from './sounds/correct.mp3';
import wrongSound from './sounds/wrong.mp3';
import startSound from './sounds/start.mp3';
import endSound from './sounds/end.mp3';
import restartSound from './sounds/restart.mp3';

const App = () => {
  const [targetColor, setTargetColor] = useState('');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [time, setTime] = useState(10);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    playSound(startSound);
    generateTargetColor();
  }, []);

  useEffect(() => {
    if (time === 0) {
      endGame();
    }
  }, [time]);

  const generateTargetColor = () => {
    const colors = ['red', 'blue', 'green', 'yellow'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setTargetColor(randomColor);
  };

  const handleSquareClick = (clickedColor) => {
    if (clickedColor === targetColor) {
      setScore(score + 1);
      generateTargetColor();
      playSound(correctSound);
    } else {
      setLives(lives - 1);
      if (lives === 1) {
        endGame();
      }
      shakeSquares();
      playSound(wrongSound);
    }
  };

  const endGame = () => {
    setGameOver(true);
    playSound(endSound);
  };

  const restartGame = () => {
    setScore(0);
    setLives(3);
    setTime(10);
    setGameOver(false);
    generateTargetColor();
    playSound(restartSound);
  };

  useEffect(() => {
    let countdownTimer = null;
    if (!gameOver) {
      countdownTimer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => clearInterval(countdownTimer);
  }, [gameOver]);

  const playSound = (sound) => {
    const audio = new Audio(sound);
    audio.play();
  };

  const shakeSquares = () => {
    const squares = document.querySelectorAll('.square');
    squares.forEach((square) => {
      square.classList.add('shake');
      setTimeout(() => {
        square.classList.remove('shake');
      }, 500);
    });
  };

  const handleKeyDown = (event) => {
    switch (event.key) {
      case '1':
        handleSquareClick('red');
        break;
      case '2':
        handleSquareClick('blue');
        break;
      case '3':
        handleSquareClick('green');
        break;
      case '4':
        handleSquareClick('yellow');
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  return (
    <div className="container">
      <div className="score-container">
        <h2>Color Matcher</h2>
        <p>Score: {score}</p>
      </div>
      {gameOver ? (
        <div className="game-over">
          <h2>Game Over</h2>
          <p>Final Score: {score}</p>
          <button className="button restart-button" onClick={restartGame}>
            Restart
          </button>
        </div>
      ) : (
        <div>
          <div
            className="target-color"
            style={{ backgroundColor: targetColor }}
          ></div>
          <p>Target Color</p>
          <p>Lives: {lives}</p>
          <p>Time Left: {time}</p>
          <div className="square-container">
            <button
              className={`square red`}
              onClick={() => handleSquareClick('red')}
            >
              Red
            </button>
            <button
              className={`square blue`}
              onClick={() => handleSquareClick('blue')}
            >
              Blue
            </button>
            <button
              className={`square green`}
              onClick={() => handleSquareClick('green')}
            >
              Green
            </button>
            <button
              className={`square yellow`}
              onClick={() => handleSquareClick('yellow')}
            >
              Yellow
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;



*/

/*
import React, { useState, useEffect } from 'react';
import './ColorMatcher.css';

const App = () => {
  const [targetColor, setTargetColor] = useState('');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [time, setTime] = useState(10);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    generateTargetColor();
  }, []);

  useEffect(() => {
    if (time === 0) {
      endGame();
    }
  }, [time]);

  const generateTargetColor = () => {
    const colors = ['red', 'blue', 'green', 'yellow'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setTargetColor(randomColor);
  };

  const handleSquareClick = (clickedColor) => {
    if (clickedColor === targetColor) {
      setScore(score + 1);
      generateTargetColor();
    } else {
      setLives(lives - 1);
      if (lives === 1) {
        endGame();
      }
    }
  };

  const endGame = () => {
    setGameOver(true);
  };

  const restartGame = () => {
    setScore(0);
    setLives(3);
    setTime(10);
    setGameOver(false);
    generateTargetColor();
  };

  useEffect(() => {
    let countdownTimer = null;
    if (!gameOver) {
      countdownTimer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => clearInterval(countdownTimer);
  }, [gameOver]);

  return (
    <div className="container">
      <div className="score-container">
        <h2>Color Matcher</h2>
        <p>Score: {score}</p>
      </div>
      {gameOver ? (
        <div className="game-over">
          <h2>Game Over</h2>
          <p>Final Score: {score}</p>
          <button className="button restart-button" onClick={restartGame}>
            Restart
          </button>
        </div>
      ) : (
        <div>
          <div className="target-color" style={{ backgroundColor: targetColor }}></div>
          <p>Target Color</p>
          <p>Lives: {lives}</p>
          <p>Time Left: {time}</p>
          <div className="square-container">
            <button
              className={`square red`}
              onClick={() => handleSquareClick('red')}
            >
              Red
            </button>
            <button
              className={`square blue`}
              onClick={() => handleSquareClick('blue')}
            >
              Blue
            </button>
            <button
              className={`square green`}
              onClick={() => handleSquareClick('green')}
            >
              Green
            </button>
            <button
              className={`square yellow`}
              onClick={() => handleSquareClick('yellow')}
            >
              Yellow
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
*/