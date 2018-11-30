import React, { addReducer, setGlobal } from 'reactn';
import ReactDOM from 'react-dom';
import './assets/styles/screen.scss';
import App from './components/app/app';
import cards from './constants/cards';
import planeswalkReducer from './constants/reducers/planeswalk';
import setBottomCardReducer from './constants/reducers/set-bottom-card';
import sets from './constants/sets';
import shuffle from './constants/shuffle';
import { unregister } from './register-service-worker';

const PLANECHASE_ANTHOLOGY = sets.findIndex(set => set.name === 'Planechase Anthology');
const planechaseAnthologyDeck = cards.filter(card => card.set === PLANECHASE_ANTHOLOGY);

addReducer('planeswalk', planeswalkReducer);
addReducer('setBottomCard', setBottomCardReducer);

setGlobal({
  active: 1,
  afterChoiceBottom: [],
  choose: 0,
  deck: shuffle(planechaseAnthologyDeck),
  scry: null,
  topChaos: 0
});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

unregister();
