import React, { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import { authService, getAuth, onAuthStateChanged } from 'firebase/auth';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user){
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    })
  }, [])
  return (
    <>
    <AppRouter isLoggedIn={isLoggedIn}/>
    <footer>@ 2022 Nwitter</footer>
    </>
  );
}

export default App;
