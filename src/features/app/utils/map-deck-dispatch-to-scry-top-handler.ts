import { Dispatch, SetStateAction } from 'react';
import Card from '../../../types/card';

export default function mapDeckDispatchToScryTopHandler(
  dispatch: Dispatch<SetStateAction<readonly Card[]>>,
): (card: Card) => void {
  return function handleScryTop(card: Readonly<Card>): void {
    const findCard = ({ path, set }: Readonly<Card>): boolean =>
      card.path === path && card.set === set;

    const action = (deck: readonly Card[]): readonly Card[] => {
      const index: number = deck.findIndex(findCard);
      return [
        {
          ...deck[index],
          effect: undefined,
        },
        ...deck.slice(0, index),
        ...deck.slice(index + 1),
      ];
    };

    dispatch(action);
  };
}
