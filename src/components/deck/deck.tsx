import React, { useGlobal } from 'reactn';
import Card from '../card/card';
import './deck.scss';

type CardData = [ number, number ];

const mapCards = ([ set, card ]: [ number, number ]) =>
  <Card
    card={card}
    key={set + '/' + card}
    set={set}
  />;

const Deck = () => {
  const [ active ] = useGlobal<number>('active');
  const [ deck ] = useGlobal<CardData[]>('deck');
  return (
    <div
      children={deck.slice(0, active).map(mapCards)}
      className="deck"
    />
  );
};

export default Deck;
