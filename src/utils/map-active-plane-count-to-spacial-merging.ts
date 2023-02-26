import type Card from '../types/card';
import filterCardsBySpatialMerging from './filter-cards-by-spatial-merging';
import shuffle from './shuffle';

/*
Spacial Merging:
  When you encounter ~, reveal cards from the top of your planar deck until you
  reveal two plane cards. Simultaneously planeswalk to both of them. Put all
  other cards revealed this way on the bottom of your planar deck in any order.
*/

export default function mapActivePlaneCountToSpacialMerging(
  count: number,
): (deck: readonly Card[]) => readonly Card[] {
  return (oldDeck: readonly Card[]): readonly Card[] => {
    // Place the Spatial Merging that triggered on the bottom of the deck.
    const index: number = oldDeck.findIndex(filterCardsBySpatialMerging);
    const newDeck: Card[] = [
      ...oldDeck.slice(0, index),
      ...oldDeck.slice(index + 1),
      oldDeck[index],
    ];

    const phenomena: Card[] = [];
    for (let i = 0; i < count; i++) {
      while (newDeck[i].phenomenon) {
        const phenomenon: Card = newDeck.splice(i, 1)[0];
        phenomena.push(phenomenon);
      }
    }

    return [...newDeck, ...shuffle(phenomena)];
  };
}
