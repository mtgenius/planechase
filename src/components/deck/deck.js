import React from 'react';
import { connect } from 'react-redux';
import Card from '../card/card';
import './deck.css';

const mapCards = ([ set, card ]) =>
  <Card
    card={card}
    key={set + '/' + card}
    set={set}
  />;

class Deck extends React.PureComponent {
  render() {
    return (
      <div
        children={this.props.cards.map(mapCards)}
        className="deck"
      />
    );
  }
}

export default connect(
  ({ active, deck }) => ({
    cards: deck.slice(0, active)
  })
)(Deck);
