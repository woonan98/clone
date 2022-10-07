import React, { useState } from 'react';
import AppRouter from 'components/Router';
import { authService } from 'fbase';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUasr);
  return (
    <>
    <AppRouter isLoggedIn={isLoggedIn}/>
    <footer>@ 2020 Nwitter</footer>
    </>
  );
}

export default App;
