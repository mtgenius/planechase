import type { Dispatch, SetStateAction } from 'react';
import { useMemo } from 'react';
import type { ScryCard } from '../components/scrying-banner';
import useEvent from '../../../hooks/use-event';
import type Card from '../../../types/card';
import mapDeckDispatchToScryBottomHandler from '../utils/map-deck-dispatch-to-scry-bottom-handler';
import mapDeckDispatchToScryTopHandler from '../utils/map-deck-dispatch-to-scry-top-handler';

interface Props {
  readonly activePlaneCount: number;
  readonly cards: readonly Card[];
  readonly setDeck: Dispatch<SetStateAction<readonly Card[]>>;
}

const createScryTopHandler = ({
  activePlaneCount,
  card,
  setDeck,
}: {
  readonly activePlaneCount: number;
  readonly card: Card;
  readonly setDeck: Dispatch<SetStateAction<readonly Card[]>>;
}): VoidFunction => {
  return function handleScryTop(): void {
    const findCard = ({ path, set }: Readonly<Card>): boolean =>
      card.path === path && card.set === set;

    const action = (deck: readonly Card[]): readonly Card[] => {
      const index: number = deck.findIndex(findCard);
      return [
        ...deck.slice(0, activePlaneCount),
        {
          ...deck[index],
          effect: undefined,
        },
        ...deck.slice(activePlaneCount, index),
        ...deck.slice(index + 1),
      ];
    };

    setDeck(action);
  };
};

export default function useScryingCards({
  activePlaneCount,
  cards,
  setDeck,
}: Readonly<Props>): readonly ScryCard[] {
  const mapCardToScry = useEvent(
    (card: Readonly<Card>): ScryCard => ({
      key: `${card.set}/${card.name}`,
      name: card.name,
      onBottom(): void {
        const handleScryBottom = mapDeckDispatchToScryBottomHandler(setDeck);
        handleScryBottom(card);
      },
      onTop: createScryTopHandler({
        activePlaneCount,
        card,
        setDeck,
      }),
    }),
  );

  return useMemo(
    (): readonly ScryCard[] => cards.map(mapCardToScry),
    [cards, mapCardToScry],
  );
}
