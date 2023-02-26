import DEFAULT_DECK from '../constants/default-deck';
import type Card from '../types/card';
import shuffle from './shuffle';

export default function initializeDeck(): readonly Card[] {
  return shuffle(DEFAULT_DECK);
}
