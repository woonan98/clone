import React, { useState } from 'react';
import { authService } from 'fbase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const AuthForm = () => {
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
                {error}
            </form>
            <span onClick={toggleNewAccount}>{newAccount ? "Sign In" : "Create New Account"}</span>
        </div>
    )
}

export default AuthForm;