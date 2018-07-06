import React from 'react';
import cards from '../../cards';
import './card.css';

export default class Card extends React.PureComponent {

  get src() {
    const card = cards.cards[this.props.card];
    const set = cards.sets[this.props.set];
    return `images/${set.path}/${card.path}.${set.ext}`;
  }

  render() {
    return (
      <div className="card">
        <img
          alt={cards.cards[this.props.card].name}
          src={this.src}
        />
      </div>
    );
  }
}
