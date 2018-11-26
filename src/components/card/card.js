import React, { useGlobal } from 'reactn';
import cards from '../../cards';
import './card.scss';

const useCard = (card, set) => {
  const bottomCard = useGlobal((global, cardId, setId) => {
    const findCard = ([ s, c ]) => s === setId && c === cardId;
    const index = global.deck.findIndex(findCard);
    return {
      deck: [
        ...global.deck.slice(0, index),
        global.deck[global.active],
        ...global.deck.slice(index + 1, global.active),
        ...global.deck.slice(global.active + 1, global.deck.length),
        [ setId, cardId ]
      ]
    };
  });

  const handleClick = e => {
    e.preventDefault();
    bottomCard(card, set);
  };

  return { handleClick };
};

const Card = ({ card, set }) => {
  const { handleClick } = useCard(card, set);
  const cardInfo = cards.cards[card];
  const setInfo = cards.sets[set];
  return (
    <a
      className="card"
      href="#"
      onClick={handleClick}
    >
      <img
        alt={cards.cards[card].name}
        src={`images/${setInfo.path}/${cardInfo.path}.${setInfo.ext}`}
      />
    </a>
  );
};

export default Card;
