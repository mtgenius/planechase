import type Card from '../types/card';

export default function mapCardToInterplanarTunnel(card: Readonly<Card>): Card {
  return {
    ...card,
    effect: 'interplanar-tunnel',
  };
}
