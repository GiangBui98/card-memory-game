import "./Result.css";

const Result = ({ winGame, timeToWin, timer, resetGame }) => {

  const startNewGame = () => {
    resetGame()
  }
  return (
    <div>
      <div class={winGame ? "modal-container" : "modal-container-hidden"}>
        <div class="modal">
          <h3>You Won! Congratulation!</h3>
          <p>Time taken: {timeToWin}s</p>
          <button className="new-game-button" onClick={startNewGame}>Start New Game</button>
        </div>
      </div>

      <div class={timer <= 0 ? "modal-container" : "modal-container-hidden"}>
        <div class="modal">
        <h3>You Lost! Re-play Game Now!</h3>
        <button className="new-game-button" onClick={startNewGame}>Start New Game</button>
        </div>
      </div>
    </div>
  );
};

export default Result;
