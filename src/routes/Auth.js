import React, { useState } from 'react';
import { authService } from 'fbase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth';

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChangeInput = (e) => {
        const { target : { name, value }
    } = e;
    if (name === "email"){
        setEmail(value);
    } else if (name === "password"){
        setPassword(value);
    }
    }
    
    const onSubmit = async(e) => {
        e.preventDefault();
        try {
            let data;
            if (newAccount){
                data = await createUserWithEmailAndPassword(
                    authService, email, password
                );
            } else {
                data = await signInWithEmailAndPassword(
                    authService, email, password
                );
            }
            console.log(data);
        } catch (error){
            setError(error.message);
        }
    } 

    const toggleNewAccount = () => setNewAccount((prev) => !prev);

    const onSocialClick = async (e) => {
        const {
            target : { name },
        } = e;
        let provider;
        if (name === "google") {
            provider = new GoogleAuthProvider();
        } else if (name === "github"){
            provider = new GithubAuthProvider();
        }
        await signInWithPopup(authService, provider);
    }

    return (
        <div>
            <form>
                <input
                    name="email" 
                    type="text"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={onChangeInput}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={onChangeInput}
                />
                <input
                    type="submit"
                    onClick={onSubmit}
                    value={newAccount ? "Create Account" : "Log In"}
                />
            </form>
            <span onClick={toggleNewAccount}>{newAccount ? "Sign In" : "Create New Account"}</span>
            {error}
            <div>
                <button name="google" onClick={onSocialClick}>Continue with Google</button>
                <button name="github" onClick={onSocialClick}>Continue with Github</button>
            </div>
        </div>
    )
    
}

export default Auth;