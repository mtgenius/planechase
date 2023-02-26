import type Card from '../types/card';

export default function filterCardsByPlane({
  phenomenon,
}: Readonly<Card>): boolean {
  return !phenomenon;
}
