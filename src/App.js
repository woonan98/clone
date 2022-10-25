import React, { useEffect, useState } from 'react';
import Router from 'components/Router';
import { onAuthStateChanged } from 'firebase/auth';
import { authService } from 'fbase';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(()=>{
    onAuthStateChanged(authService, (user) => {
      if (user){
        setIsLoggedIn(true);
        setUserObj({
          displayName : user.displayName,
          uid: user.uid,
        });
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    })
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
    });
  }
  return (
    <>
    { init ? <Router refreshUser={refreshUser} isLoggedIn={isLoggedIn} userObj={userObj} /> : "Initalizing..." }
    <footer>@ 2022 Nwitter</footer>
    </>
  );
}

export default App;
