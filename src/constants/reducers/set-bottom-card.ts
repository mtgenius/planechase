import { Card } from '../cards';

interface GlobalState {
  [key: string]: any;
}

export default function setBottomCardReducer(
  global: GlobalState,
  name: Card['name'],
  path: Card['path'],
  phenomenon: Card['phenomenon'],
  set: Card['set'],
  additionalState: GlobalState = {}
) {

  // Find this card in the deck.
  const findCard = ({ name: n, set: s }: Card): boolean =>
    n === name &&
    s === set;

  const index: number = global.deck.findIndex(findCard);

  // If the card isn't found in the deck, add it.
  // (This shouldn't happen.)
  if (index === -1) {
    return {
      deck: [
        ...global.deck,
        { name, path, phenomenon, set }
      ],
      ...additionalState
    };
  }

  // Return a new deck where this card is at the end.
  return {
    deck: [
      ...global.deck.slice(0, index),
      ...global.deck.slice(index + 1, global.length),
      { name, path, set }
    ],
    ...additionalState
  };
}
