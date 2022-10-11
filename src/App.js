import React, { useEffect, useState } from 'react';
import Router from 'components/Router';
import { authService, getAuth, onAuthStateChanged } from 'firebase/auth';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const auth = getAuth();
  const user = auth.currentUser;
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user){
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    })
  }, [])
  return (
    <>
    { init ? <Router isLoggedIn={isLoggedIn} userObj={userObj} /> : "Initalizing..." }
    <footer>@ 2022 Nwitter</footer>
    </>
  );
}

export default App;
