import React from 'react';
import { useGlobal } from 'reactn';
import { Card } from '../../constants/cards';
import './action.scss';
import Chaos from './chaos/action-chaos';

const Action = () => {
  const [ action, setAction ] = useGlobal<null | string>('action');
  const [ deck ] = useGlobal<Card[]>('deck');

  // If we are in the middle of an action, there shuold be no special functionality.
  if (action !== null) {
    return null;
  }

  // Pools of Becoming has a Chaos roll.
  if (deck[0].name === 'Pools of Becoming') {
    return (
      <div className="action">
        <Chaos
          fill="#808080"
          onClick={() => {
            setAction('top3chaos');
          }}
          size={64}
          stroke="#404040"
        />
      </div>
    );
  }

  // Stairs to Infinity has a Chaos roll.
  if (deck[0].name === 'Stairs to Infinity') {
    return (
      <div className="action">
        <Chaos
          fill="#808080"
          onClick={() => {
            setAction('scry');
          }}
          size={64}
          stroke="#404040"
        />
      </div>
    );
  }

  // All other planes have no special interactions with the Planar Deck.
  return null;
};

export default Action;
