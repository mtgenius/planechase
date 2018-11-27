import React from 'react';
import cards from '../../cards.json';
import './card.scss';
import useCard from './hooks/use-card';

interface Props {
  card: number;
  set: number;
}

const Card = ({ card, set }: Props) => {
  const { className, handleClick } = useCard(card, set);
  const cardInfo = cards.cards[card];
  const setInfo = cards.sets[set];
  return (
    <a
      className={className}
      href={`#${setInfo.path}/${cardInfo.path}`}
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
