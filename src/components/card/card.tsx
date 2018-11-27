import React from 'react';
import { Card as CardType } from '../../constants/cards';
import sets from '../../constants/sets';
import './card.scss';
import useCard from './hooks/use-card';

const Card = ({ name, path, set }: CardType) => {
  const { className, handleClick } = useCard(name, path, set);
  const setInfo = sets[set];
  return (
    <a
      className={className}
      href={`#${setInfo.path}/${path}`}
      onClick={handleClick}
    >
      <img
        alt={name}
        src={`images/${setInfo.path}/${path}.${setInfo.ext}`}
      />
    </a>
  );
};

export default Card;
