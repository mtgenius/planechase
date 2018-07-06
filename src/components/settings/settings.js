import React from 'react';
import SettingsIcon from './icon/settings-icon';

export default class Settings extends React.PureComponent {

  state = {
    open: false
  };

  render() {
    return (
      <SettingsIcon />
    );
  }
}
