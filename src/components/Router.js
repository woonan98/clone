import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from 'routes/Auth';
import Home from 'routes/Home';
import Profile from 'routes/Profile';
import Navigation from 'components/Navigation';
import Nweet from './Nweet';

const AppRouter = ({ isLoggedIn, userObj }) => {
    return (
        <Router>
            { isLoggedIn && <Navigation/> }
            <Routes>
                {isLoggedIn ? 
                    <>
                    <Route path="/" element={<Home userObj={userObj} isOwner={Nweet.createId === userObj.uid} />} />
                    <Route path="/profile" element={<Profile userObj={userObj} />}/>
                    </>
                    : 
                    <Route path="/" element={<Auth />} />
                }
            </Routes>
        </Router>
    )
}

export default AppRouter;