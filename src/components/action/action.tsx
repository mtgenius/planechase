import React from 'reactn';
import './action.scss';
import Chaos from './chaos/action-chaos';

export default class Action extends React.PureComponent {

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

    // Scrying
    if (this.global.scry !== null) {
      return (
        <>
          <button onClick={this.scryBottom}>
            Bottom
          </button>
          <button onClick={this.scryTop}>
            Top
          </button>
        </>
      );
    }

    // Executing X Chaos abilities at the top of the deck.
    if (this.global.topChaos > 0) {
      return (
        <button>
          <strong>{this.global.topChaos}</strong> Chaos remaining
        </button>
      );
    }

    const actions: (() => void)[] = [];
    for (let i = 0; i < this.global.active; i++) {

      // Plane: Execute the Chaos action of the top 3 cards.
      if (this.global.deck[i].name === 'Pools of Becoming') {
        actions.push(this.poolsOfBecoming);
      }
    
      // Plane: Scry the top card.
      if (this.global.deck[i].name === 'Stairs to Infinity') {
        actions.push(this.stairsToInfinity);
      }
    }

    // If there is no Chaos functionality for these planes,
    //   don't display an icon.
    if (actions.length === 0) {
      return null;
    }

    return (
      <div className="action">
        {actions.map((a, i) =>
          <Chaos
            key={i}
            onClick={a}
          />
        )}
      </div>
    );
  }
}
