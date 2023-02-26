import type Card from '../types/card';

interface CardJson {
  readonly name: string;
  readonly path: string;
  readonly phenomenon?: boolean | undefined;
}

interface SetJson {
  readonly cards: CardJson[];
}

export default function mapSetJsonToCards(
  { cards }: SetJson,
  set: number,
): Card[] {
  const mapCardJsonToCard = (card: CardJson): Card => ({
    ...card,
    phenomenon: card.phenomenon === true,
    set,
  });

  return cards.map(mapCardJsonToCard);
}
