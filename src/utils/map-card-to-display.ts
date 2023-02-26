import type Card from '../types/card';
import type DisplayCard from '../types/display-card';
import mapCardToImage from './map-card-to-image';

export default function mapCardToDisplay(card: Readonly<Card>): DisplayCard {
  const { name, path, set } = card;
  return {
    disabled: false,
    effect: false,
    image: mapCardToImage(card),
    key: `${set}/${path}`,
    name,
  };
}
