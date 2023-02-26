import type Card from '../types/card';

export default function filterCardsBySpatialMerging({
  name,
}: Readonly<Card>): boolean {
  return name === 'Spatial Merging';
}
