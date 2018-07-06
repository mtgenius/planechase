import shuffle from './shuffle';
import cards from '../cards';

const planechaseAnthologyDeck = cards.sets[2].cards.map((card) => [ 2, card ]);
shuffle(planechaseAnthologyDeck);

const INITIAL_STATE = {
  active: 3,
  deck: planechaseAnthologyDeck
};

export default (state = INITIAL_STATE, action) => {
  return state;
};
