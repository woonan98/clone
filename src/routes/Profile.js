import React, { useEffect, useState } from 'react';
import { authService, db } from 'fbase';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';


const Profile = ({ refreshUser, userObj }) => {
    const navigate = useNavigate();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const [newProfile, setNewProfile] = useState("");
    const [profile, setProfile] = useState("");
    
    const onClickLogOut = () => {
        authService.signOut();
        navigate('/');
    }; 

    const getMyNweet = async() => {
        const q = query(collection(db, "nwitter"),where("creatorId", "==", userObj.uid),orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        /* querySnapshot.forEach((doc) => {
            console.log(doc.id, "=>", doc.data());
        }) */
    }

    const onChange = (e) => {
        const { target :{ value } } = e;
        setNewDisplayName(value);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
            if (userObj.displayName !== newDisplayName){
                await updateProfile(authService.currentUser, {
                    displayName: `${newDisplayName}`
                });
                refreshUser();
            }

    }


    

    useEffect(() => {
        getMyNweet();
    })

    return (
        <>
        <form onSubmit={onSubmit}>
            <input 
                type="text" 
                placeholder="Display Name"
                value={newDisplayName}
                onChange={onChange} 
            />
            <input type="submit"
                value="Update Profile"
            />
        </form>
            <button onClick={onClickLogOut}>Log Out</button>
        </>
    )
}

export default Profile;