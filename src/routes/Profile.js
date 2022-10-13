import React from 'react';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    const onClickLogOut = () => {
        auth.signOut();
        navigate('/');
    } 
    return (
        <>
            <button onClick={onClickLogOut}>Log Out</button>
        </>
    )
}

export default Profile;