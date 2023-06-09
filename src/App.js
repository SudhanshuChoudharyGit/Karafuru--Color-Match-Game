import React, { useState, useEffect, useRef  } from 'react';
import './ColorMatcher.css';

import StartPage from './pages/StartPage.js';


import correctSound from './sounds/correct.mp3';
import wrongSound from './sounds/wrong.mp3';
import startSound from './sounds/start.mp3';
import endSound from './sounds/end.mp3';
import restartSound from './sounds/restart.mp3';


import avatar1 from './avatars/avatar1.png';
import avatar2 from './avatars/avatar2.png';
import avatar3 from './avatars/avatar3.png';
import avatar4 from './avatars/avatar4.png';
import avatar5 from './avatars/avatar5.png';
import avatar6 from './avatars/avatar6.png';
import avatar7 from './avatars/avatar7.png';
import avatar8 from './avatars/avatar8.png';


import { mix } from 'polished';

import firebase from './firebase';


// Array of avatar images
const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8];

// Array of color options
const colorOptions = ['#FF5555', '#FFE459', '#466AEA', '#3CE46B'];


const GameOverScreen = ({ score, leaderboard, selectedName, selectedAvatar, restartGame }) => {
  const [playerRank, setPlayerRank] = useState(null);

  useEffect(() => {
    // Find the rank of the current player in the leaderboard
    const rank = leaderboard.findIndex((item) => item.name === selectedName && item.avatar === selectedAvatar && item.score === score);
    setPlayerRank(rank);
  }, [score, leaderboard, selectedName, selectedAvatar]);

  return (
    <div className="game-over-screen">
      <div className="game-over">
        <h2>Game Over</h2>
        <h3>Score<br></br>{score}</h3>
        {/* <h3>Your rank <br></br>{playerRank !== null ? playerRank + 1:'-'}</h3> */}
        <div class="go-square-container">
        <button className="go-square" onClick={restartGame}>
          <span className="go-square-front">Restart</span>
        </button>
        <button className="go-square" onClick={() => window.location.reload()}>
        <span className="go-square-front">New Game</span>
        </button>
        </div>
      </div>
      <div className="leaderboard">
        <h1>Top 10s</h1>
        <ul>
          {leaderboard.map((item, index) => (
            <li key={index} className={index === playerRank ? 'highlighted' : ''}>
              <span className="numbering">{index + 1}{"."}</span>
              <img src={item.avatar} alt={`Avatar of ${item.name}`} />
              <span>{item.name}</span>
              <div className="score-leaderboard">{item.score}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const App = () => {
  // State variables using React Hooks
  const [targetColor, setTargetColor] = useState('');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [time, setTime] = useState(12);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [selectedName, setSelectedName] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);
  const [shouldShake, setShouldShake] = useState(false);
  const [showStartPage, setShowStartPage] = useState(true); //start page
  const [showAvatarPage, setshowAvatarPage] = useState(false); //avatar page
 // const firstSquareRef = useRef(null); //keyboard comp


//   useEffect(() => {
//     if (firstSquareRef.current) {
//       firstSquareRef.current.focus();
//     }
//   }, []);
  

  //shake effect decider
  useEffect(() => {
    if (lives < 3) {
      setShouldShake(true);
      setTimeout(() => {
        setShouldShake(false);
      }, 500);
    }
  }, [lives]);


  //*************OLDER LEADERBOARD CODE************//
/*
  // Load leaderboard from local storage on component mount
  useEffect(() => {
    const storedLeaderboard = JSON.parse(localStorage.getItem('leaderboard'));
    if (storedLeaderboard) {
      setLeaderboard(storedLeaderboard);
    }
  }, []);

  // Update leaderboard and store it in local storage when game is over
  useEffect(() => {
    if (gameOver) {
      const newScore = { name: selectedName, avatar: selectedAvatar, score };
      const newLeaderboard = [...leaderboard, newScore].sort((a, b) => b.score - a.score).slice(0, 10);
      setLeaderboard(newLeaderboard);
      localStorage.setItem('leaderboard', JSON.stringify(newLeaderboard));
    }
  }, [gameOver]);
*/

  // Load leaderboard from the Realtime Database on component mount
  useEffect(() => {
    const leaderboardRef = firebase.database().ref('leaderboard');
    leaderboardRef.on('value', (snapshot) => {
      const leaderboardData = snapshot.val();
      const leaderboardArray = leaderboardData ? Object.values(leaderboardData) : [];
      setLeaderboard(leaderboardArray.sort((a, b) => b.score - a.score).slice(0, 10));
    });
  }, []);

  // Update leaderboard in the Realtime Database when game is over
// Update leaderboard in the Realtime Database when game is over
useEffect(() => {
  if (gameOver) {
    const leaderboardRef = firebase.database().ref('leaderboard');
    leaderboardRef.once('value', (snapshot) => {
      const leaderboardData = snapshot.val();
      const leaderboardArray = leaderboardData ? Object.values(leaderboardData) : [];
      const playerScoreIndex = leaderboardArray.findIndex(
        entry => entry.name === selectedName && entry.avatar === selectedAvatar
      );
      
      if (playerScoreIndex !== -1) {
        const playerScore = leaderboardArray[playerScoreIndex].score;
        
        if (score > playerScore) {
          const updatedScore = { name: selectedName, avatar: selectedAvatar, score };
          leaderboardRef.child(Object.keys(leaderboardData)[playerScoreIndex]).set(updatedScore);
        }
      } else{
        const newScore = { name: selectedName, avatar: selectedAvatar, score };
        leaderboardRef.push(newScore);
      }
    });
  }
}, [gameOver, score, selectedName, selectedAvatar]);

  // useEffect(() => {
  //   if (gameOver) {
  //     const newScore = { name: selectedName, avatar: selectedAvatar, score };
  //     firebase.database().ref('leaderboard').push(newScore);
  //   }
  // }, [gameOver, score, selectedName, selectedAvatar]);
  


  // Countdown timer effect
  useEffect(() => {
    if (gameStarted && time > 0 && lives > 0) {
      const timer = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if ((time === 0 || lives === 0) && !gameOver) {
      setGameOver(true);
      new Audio(endSound).play();
    }
  }, [gameStarted, time, lives, gameOver]);

  // Start a new game
  const startGame = () => {
    setshowAvatarPage(false); //avatar page is turned off
    setScore(0);
    setLives(3);
    setTime(12);
    setGameStarted(true);
    setGameOver(false);
    setTargetColor(colorOptions[Math.floor(Math.random() * colorOptions.length)]);
    new Audio(startSound).play();
  };

  // Restart the game
  const restartGame = () => {
    setScore(0);
    setLives(3);
    setTime(12);
    setGameStarted(true);
    setGameOver(false);
    setTargetColor(colorOptions[Math.floor(Math.random() * colorOptions.length)]);
    new Audio(restartSound).play();
  };

  // Handle click on a color square
  const handleSquareClick = (color) => {
    if (color === targetColor) {
      setScore(score + 1);
      setTargetColor(colorOptions[Math.floor(Math.random() * colorOptions.length)]);
      new Audio(correctSound).play();
    } else {
      setLives(lives - 1);
      new Audio(wrongSound).play();
    } };

  //keyboard support
//Handle key press
    const handleKeyPress = (event) => {
        if(gameStarted && !gameOver){
        switch (event.key) {
          case '1':
            handleSquareClick(colorOptions[0]);
            break;
          case '2':
            handleSquareClick(colorOptions[1]);
            break;
          case '3':
            handleSquareClick(colorOptions[2]);
            break;
          case '4':
            handleSquareClick(colorOptions[3]);
            break;
          default:
            break;
        }
    }
      };

    // Add event listener for key press
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [gameStarted, score, lives, gameOver]);
  

    //start game screen
    const handleStartGame = () => {
        new Audio(correctSound).play();
        setShowStartPage(false);
        setshowAvatarPage(true);
      };


  // Handle click on an avatar
  const handleAvatarClick = (avatar) => {
    setSelectedAvatar(avatar);
  };

  // Handle name input change
  const handleNameChange = (event) => {
    setSelectedName(event.target.value);
  };



    //  {showStartPage ? (
    //     <StartPage handleStartGame={handleStartGame} />
    //   ) : (
    //     // Avatar selection screen
    //     <div className="avatar-selection">
    //       <h2>Who are you gonna be???</h2>
    //       <div className="avatar-container">
    //         {avatars.map((avatar, index) => (
    //           <img
    //             key={index}
    //             src={avatar}
    //             alt={`Avatar ${index + 1}`}
    //             className={`avatar ${selectedAvatar === avatar ? 'selected' : ''}`}
    //             onClick={() => handleAvatarClick(avatar)}
    //           />
    //         ))}
    //       </div>
    //       <input type="text" value={selectedName} onChange={handleNameChange} placeholder="Enter your name" />
    //       <br></br>
    //       <button class="pushable" onClick={startGame} disabled={!selectedName || !selectedAvatar}>
    //         <span class="front">Start</span>
    //         </button>
    //     </div>
    //   )}
    return (
      <>
      {showStartPage && (
        <>
          <StartPage handleStartGame={handleStartGame} />
          
        </>
      )}
      <div className={`container ${gameOver ? 'game-over' : ''}`} tabIndex={0}>
        

      {showAvatarPage && (
                        <div className="avatar-selection">
                        <h2>Who are you gonna be???</h2>
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
                        <input type="text" maxlength="6" value={selectedName} onChange={handleNameChange} placeholder="Enter your name" />
                        <br></br>
                        <button class="pushable" onClick={startGame} disabled={!selectedName || !selectedAvatar}>
                          <span class="front">Start</span>
                          <span class="back"></span>
                          </button>
                      </div>
              )}

        {gameStarted && !gameOver && (
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
              <div className="target-color" style={{ backgroundColor: targetColor , borderColor: mix(0.8, targetColor, '#000000')}}></div>
              <div className="square-container" >
                {colorOptions.map((color, index) => (
                  <div
                    //key={index}
                    //ref={index === 0 ? firstSquareRef : null} // Set the ref for the first square
                    className={`square ${shouldShake ? 'shake' : ''}`}
                    style={{ backgroundColor: mix(0.7, color, '#000000') }}
                    //onKeyDown={(event) => handleKeyPress(event, index)}
                    onClick={() => handleSquareClick(color)}
                    //tabIndex={0}
                    >
                <span className="square-front" style={{ backgroundColor: color }}></span>
                  </div>
                ))}
              </div> 
              
            </>
          )}

        {gameOver && (
                <GameOverScreen score={score} leaderboard={leaderboard} selectedName={selectedName} selectedAvatar={selectedAvatar} restartGame={restartGame} />
          )}
    </div>
    </>
  );
};

export default App;



