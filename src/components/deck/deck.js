import React, { useGlobal } from 'reactn';
import Card from '../card/card';
import './deck.scss';

const mapCards = ([ set, card ]) =>
  <Card
    card={card}
    key={set + '/' + card}
    set={set}
  />;

const Deck = () => {
  const [ active ] = useGlobal('active');
  const [ deck ] = useGlobal('deck');
  return (
    <div
      children={deck.slice(0, active).map(mapCards)}
      className="deck"
    />
  );
};

export default Deck;
