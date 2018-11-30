import React from 'reactn';
import './action.scss';
import Chaos from './chaos/action-chaos';

export default class Action extends React.PureComponent {

  get activePlanes() {
    if (this.global.active === 1) {
      return null;
    }
    return (
      <p>
        Active Planes:{' '}
        <strong>{this.global.active}</strong>
      </p>
    );  
  }

  poolsOfBecoming = () => {
    this.setGlobal({
      topChaos: 3
    });
  };

  scryBottom = () => {
    this.global.setBottomCard(
      this.global.deck[this.global.scry].name,
      this.global.deck[this.global.scry].path,
      this.global.deck[this.global.scry].phenomenon,
      this.global.deck[this.global.scry].set, {
        scry: null
      });
  };

  scryTop = () => {
    this.setGlobal({
      scry: null
    });
  };

  stairsToInfinity = () => {
    this.setGlobal(global => ({
      scry: global.active
    }));
  };

  render() {

    // Choose
    if (this.global.choose > 0) {
      return (
        <div className="action">
          <p>Choose a plane.</p>
        </div>
      );
    }

    // Scrying
    if (this.global.scry !== null) {
      return (
        <div className="action">
          <button onClick={this.scryBottom}>
            Bottom
          </button>
          <button onClick={this.scryTop}>
            Top
          </button>
        </div>
      );
    }

    // Executing X Chaos abilities at the top of the deck.
    if (this.global.topChaos > 0) {
      return (
        <div className="action">
          <p>
            Chaos remaining:{' '}
            <strong>{this.global.topChaos}</strong>
          </p>
        </div>
      );
    }

    const chaos: (() => void)[] = [];
    for (let i = 0; i < this.global.active; i++) {

      // Plane: Execute the Chaos action of the top 3 cards.
      if (this.global.deck[i].name === 'Pools of Becoming') {
        chaos.push(this.poolsOfBecoming);
      }
    
      // Plane: Scry the top card.
      if (this.global.deck[i].name === 'Stairs to Infinity') {
        chaos.push(this.stairsToInfinity);
      }
    }

    // If there is no Chaos functionality for these planes,
    //   don't display an icon.
    if (
      this.global.active === 1 &&
      chaos.length === 0
    ) {
      return null;
    }

    return (
      <div className="action">
        {this.activePlanes}
        {chaos.map((a, i) =>
          <Chaos
            key={i}
            onClick={a}
          />
        )}
      </div>
    );
  }
}
