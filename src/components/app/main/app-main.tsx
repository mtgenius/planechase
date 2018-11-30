import React from 'reactn';
import Card from '../../card/card';
import Deck from '../../deck/deck';
import './app-main.scss';

const doNothing = () => {};

export default class AppMain extends React.PureComponent {

  activateTopChaosTimeout: null | number = null;

  componentWillUnmount() {
    if (this.activateTopChaosTimeout !== null) {
      window.clearTimeout(this.activateTopChaosTimeout);
    }
  }

  activateTopChaos = () => {
    if (this.activateTopChaosTimeout !== null) {
      window.clearTimeout(this.activateTopChaosTimeout);
    }

    console.log(this.global.deck, this.global.topChaos);

    this.global.setBottomCard(
      this.global.deck[1].name,
      this.global.deck[1].path,
      this.global.deck[1].phenomenon,
      this.global.deck[1].set, {
        scry:
          this.global.deck[1].name === 'Stairs to Infinity' ?
            1 :
            this.global.scry,
        topChaos: this.global.topChaos - 1
      }
    );
  };

  render() {

    /*
    if (null === 'reveal5bottomRandom') {
      return (
        <div className="app-main">
          <CardView {...deck[1]} />
          <CardView {...deck[2]} />
          <CardView {...deck[3]} />
          <CardView {...deck[4]} />
          <CardView {...deck[5]} />
        </div>
      );
    }
    */

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

      // Phenomena don't have Chaos abilities.
      if (this.global.deck[1].phenomenon) {
        this.activateTopChaosTimeout = window.setTimeout(this.activateTopChaos, 2500);
      }

      return (
        <div className="app-main">
          <Card
            {...this.global.deck[1]}
            onClick={
              this.global.deck[1].phenomenon ?
                doNothing :
                this.activateTopChaos
            }
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
