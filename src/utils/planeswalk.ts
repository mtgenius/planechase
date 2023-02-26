import type Card from '../types/card';
import mapCardToNoEffect from './map-card-to-no-effect';

export default function planeswalk(deck: readonly Card[]): readonly Card[] {
  return [...deck.slice(1), deck[0]].map(mapCardToNoEffect);
}
