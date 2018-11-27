import React, { setGlobal } from 'reactn';
import ReactDOM from 'react-dom';
import './assets/screen.scss';
import cards from './cards.json';
import App from './components/app/app';
import shuffle from './constants/shuffle';
import { register } from './register-service-worker';

const planechaseAnthologyDeck = cards.sets[2].cards.map(card => [ 2, card ]);
shuffle(planechaseAnthologyDeck);

setGlobal({
  active: 1,
  deck: planechaseAnthologyDeck
});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

register();
