import { Dispatch, SetStateAction } from 'react';
import type Card from '../../../types/card';

export default function mapDeckDispatchToScryBottomHandler(
  dispatch: Dispatch<SetStateAction<readonly Card[]>>,
): (card: Card) => void {
  return function handleScryBottom(card: Readonly<Card>): void {
    const findCard = ({ path, set }: Readonly<Card>): boolean =>
      card.path === path && card.set === set;

    const action = (deck: readonly Card[]): readonly Card[] => {
      const index: number = deck.findIndex(findCard);
      return [
        ...deck.slice(0, index),
        ...deck.slice(index + 1),
        {
          ...deck[index],
          effect: undefined,
        },
      ];
    };

    dispatch(action);
  };
}
