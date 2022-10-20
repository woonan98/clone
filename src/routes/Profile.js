import React, { useEffect } from 'react';
import { authService, db } from 'fbase';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';

const Profile = ({ userObj }) => {
    const navigate = useNavigate();
    const onClickLogOut = () => {
        authService.signOut();
        navigate('/');
    }; 

    const getMyNweet = async() => {
        const q = query(collection(db, "nwitter"),where("creatorId", "==", userObj.uid),orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, "=>", doc.data());
        })
    }

    useEffect(() => {
        getMyNweet();
    })
    return (
        <>
            <button onClick={onClickLogOut}>Log Out</button>
        </>
    )
}

export default Profile;