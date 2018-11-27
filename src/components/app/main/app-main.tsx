import React from 'react';
import { useGlobal } from 'reactn';
import Deck from '../../deck/deck';

const AppMain = () => {
  const [ action ] = useGlobal<null | string>('action');
  if (action === null) {
    return <Deck />;
  }
  return null;
}

export default AppMain;
