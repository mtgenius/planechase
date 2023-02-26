import type Card from '../types/card';

/*
Interplanar Tunnel:
  When you encounter ~, reveal cards from the top of your planar deck until you
  reveal five plane cards. Put a plane card from among them on top of your
  planar deck, then put the rest of the revealed cards on the bottom in a random
  order.
*/

export default function filterCardsByChoice({
  effect,
}: Readonly<Card>): boolean {
  return effect === 'interplanar-tunnel';
}
