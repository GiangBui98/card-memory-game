import "./Card.css";

const Card = ({card, handleChoice, flipped, matched}) => {

    const handleClick = () => {
        handleChoice(card)
    }

    return (
        <div className={matched ? "matched" : "card"}>
        <div className={flipped ? "flipped" : ""} >
          <img className="front" src={card.source} alt="card front" />
          <img
            onClick={handleClick}
            className="back"
            src={require("../../assets/images/cover.jpg")}
            alt="card back"
          />
        </div>
      </div>
    )
}

export default Card