import type { Dispatch, SetStateAction } from 'react';
import { useMemo } from 'react';
import type { ScryCard } from '../components/scrying-banner';
import useEvent from '../../../hooks/use-event';
import type Card from '../../../types/card';
import mapDeckDispatchToScryBottomHandler from '../utils/map-deck-dispatch-to-scry-bottom-handler';
import mapDeckDispatchToScryTopHandler from '../utils/map-deck-dispatch-to-scry-top-handler';

export default function useScryingCards(
  cards: readonly Card[],
  setDeck: Dispatch<SetStateAction<readonly Card[]>>,
): readonly ScryCard[] {
  const mapCardToScry = useEvent(
    (card: Readonly<Card>): ScryCard => ({
      key: `${card.set}/${card.name}`,
      name: card.name,
      onBottom(): void {
        const handleScryBottom = mapDeckDispatchToScryBottomHandler(setDeck);
        handleScryBottom(card);
      },
      onTop(): void {
        const handleScryTop = mapDeckDispatchToScryTopHandler(setDeck);
        handleScryTop(card);
      },
    }),
  );

  return useMemo(
    (): readonly ScryCard[] => cards.map(mapCardToScry),
    [cards, mapCardToScry],
  );
}
