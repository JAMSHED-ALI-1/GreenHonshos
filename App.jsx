
import * as React from 'react';
import Route from './src/Navigate/Route';
import FlashMessage from 'react-native-flash-message';
function App() {
  return (
   <>
   <Route/>
   <FlashMessage position="top" />
   </>
  );
}

export default App;