import React, { setGlobal } from 'reactn';
import ReactDOM from 'react-dom';
import './assets/screen.css';
import cards from './cards';
import App from './components/app/app';
import shuffle from './constants/shuffle';
import registerServiceWorker from './register-service-worker';

const planechaseAnthologyDeck = cards.sets[2].cards.map(card => [ 2, card ]);
shuffle(planechaseAnthologyDeck);

setGlobal({
  active: 3,
  deck: planechaseAnthologyDeck
});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

registerServiceWorker();

if (module.hot) {
  module.hot.accept();
}
