import React from 'react';
import Deck from '../deck/deck';
import Settings from '../settings/settings';

export default class App extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <Settings />
        <Deck />
      </React.Fragment>
    );
  }
}
