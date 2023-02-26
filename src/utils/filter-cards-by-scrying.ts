import type Card from '../types/card';

export default function filterCardsByScrying({
  effect,
}: Readonly<Card>): boolean {
  return effect === 'stairs-to-infinity';
}
