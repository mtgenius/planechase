import cardsJson from '../cards.json';
import type Card from '../types/card';
import filterCardsByDefaultDeck from '../utils/filter-cards-by-default-deck';
import flatten from '../utils/flatten';
import mapSetToCards from '../utils/map-set-to-cards';

export default cardsJson.sets
  .map(mapSetToCards)
  .reduce(flatten, [])
  .filter(filterCardsByDefaultDeck) satisfies readonly Card[];
