import React, { setGlobal } from 'reactn';
import ReactDOM from 'react-dom';
import './assets/screen.scss';
import App from './components/app/app';
import cards from './constants/cards';
import sets from './constants/sets';
import shuffle from './constants/shuffle';
import { register } from './register-service-worker';

const PLANECHASE_ANTHOLOGY = sets.findIndex(set => set.name === 'Planechase Anthology');
const planechaseAnthologyDeck = cards.filter(card => card.set === PLANECHASE_ANTHOLOGY);

setGlobal({
  active: 1,
  deck: shuffle(planechaseAnthologyDeck)
});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

register();
