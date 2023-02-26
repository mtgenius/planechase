import type Card from '../types/card';

/*
Pools of Becoming:
  Whenever you roll {CHAOS}, reveal the top three cards of your planar deck.
  Each of the revealed cards’ {CHAOS} abilities triggers. Then put the revealed
  cards on the bottom of your planar deck in any order.
*/

export default function mapCardToPoolsOfBecoming(card: Readonly<Card>): Card {
  return {
    ...card,
    effect: 'pools-of-becoming',
  };
}
