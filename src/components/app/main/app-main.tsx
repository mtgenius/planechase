import React from 'reactn';
import shuffle from '../../../constants/shuffle';
import Card from '../../card/card';
import Deck from '../../deck/deck';
import './app-main.scss';

const doNothing = () => {};

export default class AppMain extends React.PureComponent {

  activateTopChaos = (): void => {
    const topCard = this.global.deck[this.global.active];

    this.global.setBottomCard(
      topCard.name, topCard.path,
      topCard.phenomenon, topCard.set, {
        scry:
          topCard.name === 'Stairs to Infinity' ?
            1 :
            this.global.scry,
        topChaos: this.global.topChaos - 1
      }
    );
  };

  handleChooseClick = (i: number): EventListener =>
    (): void => {
      this.setGlobal(global => ({
        afterChoiceBottom: [],
        choose: 0,
        deck: [

          // Chosen card
          global.deck[i],

          // Cards after top X planes
          ...global.deck.slice(global.choose, global.deck.length),

          // Unchosen cards
          ...shuffle([
            ...global.afterChoiceBottom,
            ...global.deck.slice(0, i),
            ...global.deck.slice(i + 1, global.choose)
          ])
        ]
      }));
    };

  render() {

    // Choose
    if (this.global.choose > 0) {
      return (
        <div className="app-main">
          {new Array(this.global.choose).fill(null).map((_, i) =>
            <Card
              {...this.global.deck[i]}
              key={this.global.deck[i].set + '/' + this.global.deck[i].path}
              onClick={this.handleChooseClick(i)}
            />
          )}
        </div>
      );
    }

    // Scry
    if (this.global.scry !== null) {
      return (
        <div className="app-main">
          <Card
            {...this.global.deck[this.global.scry]}
            onClick={doNothing}
          />
        </div>
      );
    }

    // Execute the Chaos ability of the top X planar cards in the deck.
    if (this.global.topChaos > 0) {
      const topCard = this.global.deck[this.global.active];
      return (
        <div className="app-main">
          <Card
            {...topCard}
            onClick={this.activateTopChaos}
          />
        </div>
      );
    }

    return (
      <div className="app-main">
        <Deck />
      </div>
    );
  }
}
