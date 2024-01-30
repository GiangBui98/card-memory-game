import logo from "./logo.svg";
import "./App.css";
import { useEffect, useRef, useState } from "react";
import Card from "./components/cards/Card";
import Result from "./components/notifications/Result";
import SettingGame from "./components/gameSetup/SettingGame";

const baseURLImage = "./assets/images/";

let cardImages = [
  { source: require(baseURLImage + "img1.jpg") },
  { source: require(baseURLImage + "img2.jpg") },
  { source: require(baseURLImage + "img3.jpg") },
  { source: require(baseURLImage + "img4.jpg") },
  { source: require(baseURLImage + "img5.jpg") },
  { source: require(baseURLImage + "img6.jpg") },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [disableCard, setDisableCard] = useState(false)

  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  const [level, setLevel] = useState(0);
  const [gameOption, setGameOption] = useState(0);
  const [startGameDisplay, setStartGameDisplay] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const [maxItem, setMaxItem] = useState(0);

  const [maxItemCards, setMaxItemCards] = useState(0);

  const [timer, setTimer] = useState(1);
  const [maxtime, setMaxtime] = useState(0);
  const timerId = useRef(null);

  const [matchingTimes, setMatchingTimes] = useState(0);
  const [winGame, setWinGame] = useState(false);

  const [timeToWin, setTimeToWin] = useState(0);

  let maxValue = 0;

  //reset game
  const resetGame = () => {
    setCards([])
    setTurns(0)
    setDisableCard(false)
    setChoiceOne(null)
    setChoiceTwo(null)
    setLevel(0)
    setGameOption(0)
    setStartGameDisplay(0)
    setIsRunning(false)
    setTimer(1)  
    setMatchingTimes(0)
    setWinGame(false)
    setTimeToWin(0)
    clearInterval(timerId.current);
    // timerId.current = null;
    setMaxtime(0);
  }

  //display/hide New game btn
  const setGameLevel = () => {
    setStartGameDisplay(1);
    handleStart();

    if (gameOption === 1) {
      maxValue = 2;      
      // setMaxItem(2)
      // console.log("maxItem = ")
      // console.log(maxItem)

      if (level === 1) {
        setTimer(10);
        setMaxtime(10); 
      } else if (level === 2) {
        setTimer(8);
        setMaxtime(8);
      } else if (level === 3) {
        setTimer(5);
        setMaxtime(5);
      }
    } else if (gameOption === 2) {
      maxValue = 4;
      // setMaxItem(4);
      if (level === 1) {
        setTimer(20);
        setMaxtime(20);
      } else if (level === 2) {
        setTimer(15);
        setMaxtime(15);
      } else if (level === 3) {
        setTimer(10);
        setMaxtime(10); 
      }
    } else if (gameOption === 3) {
      // setMaxItem(6);
      maxValue = 6;
      if (level === 1) {
        setTimer(30);
        setMaxtime(30); 
      } else if (level === 2) {
        setTimer(25);
        setMaxtime(25); 
      } else if (level === 3) {
        setTimer(18);
        setMaxtime(18); 
      }
    }
    
    cardImages = [];

    for (let i = 1; i <= maxValue; i++) {
      cardImages.push({ source: require(baseURLImage + "img" + i + ".jpg") });
    }
    shuffleCards();
  };


  //shuffle cards
  //1. duplicate cards
  //2. randomize cards
  //3. add id for each card
  const shuffleCards = () => {
    //declare card[] for level, option

    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffledCards);
    setTurns(0);
    
  };

  //remove matching cards
  const removeMatchingCards = (cards, source) => {
    const filteredCards = cards.filter((card) => card.source !== source);
    setCards(filteredCards);
    setMatchingTimes((pre) => pre + 1);
    console.log("matching times");
    console.log(matchingTimes);
  };

  const handleEndGame = () => {
    if (matchingTimes === cardImages.length && timer > 0) {
      setWinGame(true);
    }
  };

  useEffect(() => {
    handleEndGame();
  }, [matchingTimes, timer]);

  // handle choice
  const handleChoice = (card) => {
    if(disableCard) return
    setTurns((prevTurns) => prevTurns + 1);
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    //console.log(card);
  };

  //compare 2 selected cards
  useEffect(() => {
    
    if (choiceOne && choiceTwo) {
      setDisableCard(true)
      if (choiceOne.source === choiceTwo.source) {
        //neu click lan 1 giong lan 2, set item in cards = matched
        //cards
        cards.forEach(element => {
          if(element.id == choiceOne.id || element.id == choiceTwo.id)
          {
            element.matched = true;
          }
        });
        resetTurn();
        setMatchingTimes((pre) => pre + 1);
        //removeMatchingCards(cards, choiceOne.source);
        setDisableCard(false)
      } else {
        setTimeout(() => resetTurn(), 500);
        //resetTurn();
      }
    }
  }, [choiceOne, choiceTwo]);

  // countdown
  useEffect(() => {
    if (isRunning) {
      timerId.current = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(timerId.current);
    }
    return () => clearInterval(timerId.current);
  }, [isRunning]);

  useEffect(() => {
    console.log("tick tack");
    console.log("maxtime : ", maxtime);
    console.log("timer : ", timer);
    

    if (winGame == true) {
      clearInterval(timerId.current);
      setTimeToWin(maxtime - timer);          
    } else if (timer <= 0) {
      clearInterval(timerId.current);
    }
  }, [timer]);

  // countdown
  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  //reset choice and increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisableCard(false);
    
  };

  return (
    <div className="App">      
      <div className="game-setup">
        <h1>Card Memory Game</h1>

        <h2>Select Level</h2>
        <div className="game-level">
          <button onClick={() => {setLevel(1)}} >Easy</button>
          <button onClick={() => {setLevel(2)}} >Medium</button>
          <button onClick={() => {setLevel(3)}} >Hard</button>
        </div>

        <div className="game-option">
          <button 
            onClick={() => {setGameOption(1) }}
            className={level === 0 ? "hidden" : "displayed"}
          >
            2x2
          </button>
          <button
            onClick={() => {setGameOption(2)}}
            className={level === 0 ? "hidden" : "displayed"}
          >
            4x2
          </button>
          <button
            onClick={() => {setGameOption(3)}}
            className={level === 0 ? "hidden" : "displayed"}
          >
            6x2
          </button>
        </div>

        {/* --------------- */}
        <button
          disabled={gameOption === 0 ? "disabled" : ""}
          className="startPlayingGame"
          onClick={setGameLevel}
        >
          Start Game
        </button>
      </div>
        <div className="countdown">
          <p className={startGameDisplay === 0 ? "hidden" : "displayed"}>
            Remaining Time : {timer}s
          </p>
          <p className={startGameDisplay === 0 ? "hidden" : "displayed"}>
            Actual Turns: {turns}
          </p>
        </div>
      

      <div className="card-grid">
        {cards.map((card) => (
          <Card
             key={card.id}
             card={card}
             handleChoice={handleChoice}
             flipped={card === choiceOne || card === choiceTwo || card.matched}
             matched={card.matched}
          />
        ))}
      </div>

      <Result
          winGame={winGame}
          timeToWin={timeToWin}
          timer={timer}
          resetGame={resetGame}
      /> 
    </div>
  );
}

export default App;
