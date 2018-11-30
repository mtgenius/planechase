import cardsJson from '../cards.json';

interface CardJson {
  name: string;
  path: string;
  phenomenon?: boolean;
}

export interface Card extends CardJson {
  phenomenon: boolean;
  set: number;
}

interface SetJson {
  cards: CardJson[];
}

const flatten = (acc: Card[], curr: Card[]): Card[] => acc.concat(curr);

const mapSetsToCards = ({ cards }: SetJson, set: number): Card[] =>
  cards.map(card => ({
    ...card,
    phenomenon: !!card.phenomenon,
    set
  }));

export default cardsJson.sets
  .map(mapSetsToCards)
  .reduce(flatten, []) as Card[];
