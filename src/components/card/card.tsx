import React from 'reactn';
import { Card as CardType } from '../../constants/cards';
import sets from '../../constants/sets';
import './card.scss';

interface Props extends CardType {
  onClick?: () => void;
}

interface State {
  fadingOut: boolean;
}

export default class Card extends React.PureComponent<Props, State> {

  state = {
    fadingOut: false
  };

  timeout: null | number = null;

  componentDidUpdate(_: Props, prevState: State) {

    // On state change, use a fade out animation before updating the state.
    if (
      !prevState.fadingOut &&
      this.state.fadingOut
    ) {
      this.timeout = window.setTimeout(this.nextCard, 500);
    }
  }

  componentWillUnmount() {
    if (this.timeout !== null) {
      window.clearTimeout(this.timeout);
    }
  }

  get className(): string {
    if (this.state.fadingOut) {
      return 'card card-fading-out';
    }
    return 'card';
  }

  handleClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();

    // Custom click behavior
    if (this.props.onClick) {
      this.props.onClick();
      return;
    }

    // Phenomenon: Pick the next Plane from the top 5 cards.
    if (this.props.name === 'Interplanar Tunnel') {
      // setAction('reveal5bottomRandom');
      return;
    }

    // If this card doesn't have an associated click action, fade it out.
    this.setState({
      fadingOut: true
    });
  };

  nextCard = () => {

    // Phenomenon: Spatial Merging
    // Planeswalk to two planes at the same time.
    if (this.props.name === 'Spatial Merging') {
      const deck = [ ...this.global.deck ];
      for (let i = 0; i < this.global.active + 1; i++) {
        while (deck[i].phenomenon) {
          deck.push(deck.shift());
        }
      }
      this.setGlobal(global => ({
        active: global.active + 1,
        deck
      }));
    }

    // If we are planeswalking, move all active planes
    //   to the bottom and return to a single plane.
    else {
      this.global.planeswalk();
    }
  };

  render() {
    const setInfo = sets[this.props.set];
    return (
      <a
        className={this.className}
        href={`#${setInfo.path}/${this.props.path}`}
        onClick={this.handleClick}
      >
        <img
          alt={name}
          src={`images/${setInfo.path}/${this.props.path}.${setInfo.ext}`}
        />
      </a>
    );
  }
}
