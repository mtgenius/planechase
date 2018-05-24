import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './components/app/app';
import reducer from './constants/reducer';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={createStore(reducer)}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
