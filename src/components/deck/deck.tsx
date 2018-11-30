import React from 'reactn';
import { Card as CardType } from '../../constants/cards';
import CardView from '../card/card';

const mapCards = (card: CardType) =>
  <CardView
    {...card}
    key={card.set + '/' + card.path}
  />;

export default class Deck extends React.PureComponent {
  render() {
    return <>{this.global.deck.slice(0, this.global.active).map(mapCards)}</>;
  }
}
