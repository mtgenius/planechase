import type Card from '../types/card';

export default function mapCardToNoEffect(card: Readonly<Card>): Card {
  return {
    ...card,
    effect: undefined,
  };
}
