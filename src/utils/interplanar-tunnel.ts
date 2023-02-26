import type Card from '../types/card';
import mapCardToInterplanarTunnel from './map-card-to-interplanar-tunnel';
import mapCardToNoEffect from './map-card-to-no-effect';
import shuffle from './shuffle';

/*
Interplanar Tunnel:
  When you encounter ~, reveal cards from the top of your planar deck until you
  reveal five plane cards. Put a plane card from among them on top of your
  planar deck, then put the rest of the revealed cards on the bottom in a random
  order.
*/

export default function interplanarTunnel(
  deck: readonly Card[],
): readonly Card[] {
  const newDeck: Card[] = [...deck];

  const phenomena: Card[] = [];
  for (let i = 0; i < 5; i++) {
    while (newDeck[i].phenomenon) {
      const phenomenon: Card = newDeck.splice(i, 1)[0];
      phenomena.push(phenomenon);
    }
  }

  return [
    ...newDeck.slice(0, 5).map(mapCardToInterplanarTunnel),
    ...newDeck.slice(5).map(mapCardToNoEffect),
    ...shuffle(phenomena).map(mapCardToNoEffect),
  ];
}
