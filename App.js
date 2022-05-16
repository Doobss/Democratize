import React from 'react';

import AppStack from './Navigation'
import { DispatchContextProvider } from './Store/AppContext';

export default App = () => {

  return (
    <DispatchContextProvider>
      <AppStack />
    </DispatchContextProvider>
  );
}

