import React, { useEffect, useGlobal, useState } from 'reactn';
import cards from '../../cards';
import './card.scss';

const useCard = (card, set) => {
  const [ fadingOut, setFadingOut ] = useState(false);

  useEffect(
    () => {
      let timeout = null;
      if (fadingOut) {
        timeout = setTimeout(() => {
          bottomCard(card, set);
        }, 500);
      }
      return () => {
        clearTimeout(timeout);
      };
    }
  );

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

  const className =
    fadingOut ?
      'card card-fading-out' :
      'card';

  const handleClick = e => {
    e.preventDefault();
    setFadingOut(true);
  };

  return { className, handleClick };
};

const Card = ({ card, set }) => {
  const { className, handleClick } = useCard(card, set);
  const cardInfo = cards.cards[card];
  const setInfo = cards.sets[set];
  return (
    <a
      className={className}
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
