/*

// App.js

import React, { useState } from 'react';
import Avatar from './Avatar';
import Game from './Game';

const avatars = [
  { src: './avatars/avatar1.png', alt: 'Avatar 1' },
  { src: './avatars/avatar2.png', alt: 'Avatar 2' },
  { src: './avatars/avatar3.png', alt: 'Avatar 3' },
  { src: './avatars/avatar4.png', alt: 'Avatar 4' },
];

const App = () => {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState(null);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAvatarChange = (event) => {
    setAvatar(event.target.value);
  };

  const handleAvatarSelect = (avatar) => {
    setAvatar(avatar);
  };

  const handleStartGame = () => {
    // Render the game component once the name and avatar have been chosen
    if (name && avatar) {
      return <Game name={name} avatar={avatar} />;
    }
  };

  // Render the name and avatar selection screen if the name and avatar have not been chosen yet
  if (!name || !avatar) {
    return (
      <div>
        <h1>Choose your name and avatar</h1>
        <input type="text" value={name} onChange={handleNameChange} placeholder="Enter your name" />
        <div>
          {avatars.map((avatar) => (
            <Avatar key={avatar.alt} src={avatar.src} alt={avatar.alt} onClick={() => handleAvatarSelect(avatar)} />
          ))}
        </div>
      </div>
    );
  }

  // Render the game component once the name and avatar have been chosen
  return (
    <div>
      <h1>Welcome, {name}!</h1>
      <Avatar src={avatar.src} alt={avatar.alt} />
      <button onClick={handleStartGame}>Start Game</button>
    </div>
  );
};

export default App;
*/

/* -------------------------------------------------- */

/* 
import React, { useState, useEffect } from 'react';
import './ColorMatcher.css';
import Avatar from './Avatar';

const avatars = [
  { id: 1, src: './avatars/avatar1.png' },
  { id: 2, src: './avatars/avatar2.png' },
  { id: 3, src: './avatars/avatar3.png' },
  { id: 4, src: './avatars/avatar4.png' },
  { id: 5, src: './avatars/avatar5.png' },
];

function App() {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState(avatars[0]);
  const [score, setScore] = useState(0);
  const [targetColor, setTargetColor] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [squares, setSquares] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    generateSquares();
    generateTargetColor();
    fetchLeaderboard();
  }, []);

  useEffect(() => {
    if (gameOver) {
      updateLeaderboard();
    }
  }, [gameOver]);

  const generateSquares = () => {
    const newSquares = [];
    for (let i = 0; i < 4; i++) {
      const color = generateRandomColor();
      newSquares.push({ id: i, color: color });
    }
    setSquares(newSquares);
  };

  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const generateTargetColor = () => {
    const colors = ['red', 'blue', 'green', 'yellow'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    const color = colors[randomIndex];
    return color;
  };
  

  const handleSquareClick = (color) => {
    if (color === targetColor) {
      setScore(score + 1);
      generateSquares();
      generateTargetColor();
    } else {
      setGameOver(true);
    }
  };

  const handleRestartClick = () => {
    setScore(0);
    setGameOver(false);
    generateSquares();
    generateTargetColor();
  };

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch('/leaderboard');
      const data = await response.json();
      setLeaderboard(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateLeaderboard = async () => {
    try {
      const response = await fetch('/leaderboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          avatar: avatar.src,
          score: score,
        }),
      });
      const data = await response.json();
      setLeaderboard(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAvatarChange = (event) => {
    const selectedAvatar = avatars.find((avatar) => avatar.id === parseInt(event.target.value));
    setAvatar(selectedAvatar);
  };

  if (!name) {
    return (
      <div className="container">
        <h1>Color Matcher</h1>
        <div className="form-container">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} onChange={handleNameChange} />
          <label htmlFor="avatar">Avatar:</label>
          <select id="avatar" value={avatar.id} onChange={handleAvatarChange}>
            {avatars.map((avatar) => (
              <option key={avatar.id} value={avatar.id}>
                {avatar.src}
              </option>
            ))}
          </select>
          <button onClick={() => setName(name)}>Start Game</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Color Matcher</h1>
      <div className="score-container">
        <h2>Score:</h2>
        <p>{score}</p>
      </div>
      <div className="game-container">
        <div className="square-container">
          {squares.map((square) => (
            <button
              key={square.id}
              className="square"
              style={{ backgroundColor: square.color }}
              onClick={() => handleSquareClick(square.color)}
            ></button>
          ))}
        </div>
        <div className="target-color" style={{ backgroundColor: targetColor }}></div>
      </div>
      <div className="leaderboard">
        <h2>Leaderboard</h2>
        <ul>
          {leaderboard.map((entry) => (
            <li key={entry.id}>
              <Avatar src={entry.avatar} />
              <span>{entry.name}</span>
              <span>{entry.score}</span>
            </li>
          ))}
        </ul>
      </div>
      {gameOver && (
        <div className="game-over">
          <h2>Game Over</h2>
          <p>Your score: {score}</p>
          <button className="restart-button" onClick={handleRestartClick}>
            Restart
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
*/


/* -------------------------------------------------- */

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
            ></button>
            <button
              className={`square blue`}
              onClick={() => handleSquareClick('blue')}
            ></button>
            <button
              className={`square green`}
              onClick={() => handleSquareClick('green')}
            ></button>
            <button
              className={`square yellow`}
              onClick={() => handleSquareClick('yellow')}
            ></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
*/