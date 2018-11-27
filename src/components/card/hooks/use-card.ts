import { useEffect, useState } from 'react';
import { useGlobal } from 'reactn';

type ClickHandler = (e: React.MouseEvent<HTMLAnchorElement>) => void;

interface CardHook {
  className: string;
  handleClick: ClickHandler;
}

export default function useCard(card: number, set: number): CardHook {
  const [ fadingOut, setFadingOut ] = useState(false);

  useEffect(
    () => {
      let timeout: number;
      if (fadingOut) {
        timeout = window.setTimeout(() => {
          bottomCard(card, set);
        }, 500);
      }
      return () => {
        window.clearTimeout(timeout);
      };
    }
  );

  const bottomCard = useGlobal((global, cardId: number, setId: number) => {
    const findCard = ([ s, c ]: [ number, number ]) => s === setId && c === cardId;
    const index = global.deck.findIndex(findCard);
    return {
      deck: [
        ...global.deck.slice(0, index),
        global.deck[global.active],
        ...global.deck.slice(index + 1, global.active),
        ...global.deck.slice(global.active + 1, global.deck.length),
        [ setId, cardId ]
      ]
    };
  });

  const className =
    fadingOut ?
      'card card-fading-out' :
      'card';

  const handleClick: ClickHandler = e => {
    e.preventDefault();
    setFadingOut(true);
  };

  return { className, handleClick };
};
