import cardsJson from '../cards.json';

interface CardJson {
  name: string;
  path: string;
}

export interface Card extends CardJson {
  set: number;
}

interface SetJson {
  cards: CardJson[];
}

const flatten = (acc: Card[], curr: Card[]): Card[] => acc.concat(curr);

const mapSetsToCards = ({ cards }: SetJson, set: number): Card[] =>
  cards.map(card => ({ ...card, set }));

export default cardsJson.sets
  .map(mapSetsToCards)
  .reduce(flatten, []) as Card[];
