import type Card from './card';

export default interface DeckCard extends Card {
  readonly index: number;
}
