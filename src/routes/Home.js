import React, { useState, useEffect } from 'react';
import { db, storage } from 'fbase';
import Nweet from 'components/Nweet';
import { collection, addDoc, query, onSnapshot, orderBy } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment] = useState("");

    
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
    const onSubmit = async(e) => {
        e.preventDefault();
        let attachmentUrl = "";
        try {
            if (attachment !== ""){
                const imageRef = ref(storage, `${userObj.uid}/${uuidv4()}`);
                const response = await uploadString(imageRef, attachment, "data_url");
                attachmentUrl = await getDownloadURL(response.ref);
            }
            const nweetObj = {
                text : nweet,
                createdAt : Date.now(),
                creatorId : userObj.uid,
                attachmentUrl,
            }
            await addDoc(collection(db, "nwitter"), nweetObj);
            setNweet("");
            setAttachment("");
    
        }catch(error){
            console.error("errorMessage :", error);
        }
    };
    const onChange = ({ target : {value} }) => {
        setNweet(value);
    };

    const onFileChange = (e) => {
        const { target : { files } } = e;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const { currentTarget : { result } } = finishedEvent;
            setAttachment(result)
        }
        reader.readAsDataURL(theFile);
    }

    const onClickPhotoClear = () => {
        setAttachment(null);
    }

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
                <input type="file" 
                    accept="image/*"
                    onChange={onFileChange}     
                />
                <input 
                    type="submit" 
                    value="nweet"
                />
                    { attachment && 
                        <div>
                            <img src={attachment} width="50px" height="50px"  />
                            <button onClick={onClickPhotoClear}>Cancel Upload</button>
                        </div>
                    }
                
            </form>
            <div>
                {nweets.map((nweet)=> (
                        <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid}/ >
                ))}
            </div>
        </>
    )
}

export default Home;