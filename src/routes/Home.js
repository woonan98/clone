import React, { useState, useEffect } from 'react';
import { db } from 'fbase';
import Nweet from 'components/Nweet';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import NweetFactory from 'components/NweetFactory';


const Home = ({ userObj }) => {
    const [nweets, setNweets] = useState([]);

    useEffect(()=>{
        const q = query(collection(db, "nwitter"),
        orderBy("createdAt", "desc"));
        onSnapshot(q, (querySnapshot) => {
            const nweetArr = querySnapshot.docs.map((doc) => ({
                id : doc.id,
                ...doc.data()
            }))
            setNweets(nweetArr);
        })
    },[])
    return (
        <>  
            <NweetFactory userObj={userObj}/>
            <div>
                {nweets.map((nweet)=> (
                        <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid}/ >
                ))}
            </div>
        </>
    )
}

export default Home;