import React, { useState, useEffect } from 'react';
import { db } from 'fbase';
import { collection, addDoc, getDocs, query } from 'firebase/firestore';

const Home = () => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const getNweets = async()=>{
        const q = query(collection(db, "nwitter"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const nweetObject = {
                ...doc.data(),
                id : doc.id
            };
            setNweets((prev) => [nweetObject, ...prev]);
        });
    };
    useEffect(()=>{
        getNweets();
    },[])
    const onSubmit = async(e) => {
        e.preventDefault();
        try {
            const docRef = await addDoc(collection(db, "nwitter"), {
                nweet : nweet,
                createdAt : Date.now()
            });
        }catch(error){
            console.error("errorMessage :", error);
        }
        setNweet("");
    };
    const onChange = ({ target : {value} }) => {
        setNweet(value);
    };
    return (
        <>    
            <form onSubmit={onSubmit}>
                <input
                    value={nweet}
                    onChange={onChange}
                    type="text"
                    placeholder="What's on your mind?"
                    maxLength={120}
                />
                <input 
                    type="submit" 
                    value="nweet"
                />
            </form>
            <div>
                {nweets.map((nweet)=> (
                    <div key={nweet.id}>
                        <h4>{nweet.nweet}</h4>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Home;