import React from 'react';
import { authService } from 'fbase';
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import AuthForm from 'components/AuthForm';

const Auth = () => {

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
        <>
            <AuthForm/>
            <div>
                <button name="google" onClick={onSocialClick}>Continue with Google</button>
                <button name="github" onClick={onSocialClick}>Continue with Github</button>
            </div>
        </>
    )
    
}

export default Auth;