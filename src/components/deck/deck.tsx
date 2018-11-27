import React, { useGlobal } from 'reactn';
import { Card as CardType } from '../../constants/cards';
import CardView from '../card/card';
import './deck.scss';

const mapCards = ({ name, path, set }: CardType) =>
  <CardView
    name={name}
    key={set + '/' + path}
    path={path}
    set={set}
  />;

const Deck = () => {
  const [ active ] = useGlobal<number>('active');
  const [ deck ] = useGlobal<CardType[]>('deck');
  return (
    <div
      children={deck.slice(0, active).map(mapCards)}
      className="deck"
    />
  );
};

export default Deck;
