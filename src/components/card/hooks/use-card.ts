import { useEffect, useState } from 'react';
import { useGlobal } from 'reactn';
import { Card } from '../../../constants/cards';

type ClickHandler = (e: React.MouseEvent<HTMLAnchorElement>) => void;

interface CardHook {
  className: string;
  handleClick: ClickHandler;
}

export default function useCard(name: Card['name'], path: Card['path'], set: Card['set']): CardHook {

  const setAction = useGlobal<null | string>('action', true);
  const [ fadingOut, setFadingOut ] = useState(false);

  const setBottomCard = useGlobal(
    (global, name: Card['name'], path: Card['path'], set: Card['set']) => {

      // Find this card in the deck.
      const findCard = ({ name: n, path: p, set: s }: Card): boolean =>
        n === name &&
        p === path &&
        s === set;

      const index: number = global.deck.findIndex(findCard);

      // If the card isn't found in the deck, add it.
      // (This shouldn't happen.)
      if (index === -1) {
        return {
          deck: [
            ...global.deck,
            { name, path, set }
          ]
        };
      }

      // Return a new deck where this card is at the end.
      return {
        deck: [
          ...global.deck.slice(0, index),
          global.deck[global.active],
          ...global.deck.slice(index + 1, global.active),
          ...global.deck.slice(global.active + 1, global.deck.length),
          { name, path, set }
        ]
      };
    }
  );

  // On state change, use a fade out animation before updating the state.
  useEffect(
    () => {
      let timeout: number;
      if (fadingOut) {
        timeout = window.setTimeout(() => {
          setBottomCard(name, path, set);
        }, 500);
      }
      return () => {
        window.clearTimeout(timeout);
      };
    }
  );

  const className =
    fadingOut ?
      'card card-fading-out' :
      'card';

  const handleClick: ClickHandler = e => {
    e.preventDefault();

    // Phenomenon: Interplanar Tunnel lets you pick the next Plane from the top 5 cards.
    if (name === 'Interplanar Tunnel') {
      setAction('reveal5bottomRandom');
    }

    // Phenomenon: Spatial Merging
    else if (name === 'Spatial Merging') {
      setAction('double');
    }

    // Default click behavior
    else {
      setFadingOut(true);
    }
  };

  return { className, handleClick };
};
