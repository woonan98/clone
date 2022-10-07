import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(false)
    const auth = getAuth();

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
            if (newAccount){
                const data = await createUserWithEmailAndPassword(
                    email, password
                );
            } else {
                const data = await signInWithEmailAndPassword(
                    email, password
                );
            }
            console.log(data);
        } catch (error){
            console.log(error);
        }
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
            <div>
                <button>Continue with Google</button>
                <button>Continue with Github</button>
            </div>
        </div>
    )
    
}

export default Auth;