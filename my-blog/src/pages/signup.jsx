import { Link, Navigate } from "react-router-dom";
import React, { useState } from "react";
import { useAuth } from "../contexts/authContext";
import { doCreateUserWithEmailAndPassword } from "../firebase/auth";

export default function SignUpPage(){

    const { userLoggedIn } = useAuth();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [isRegisted, setIsRegisted] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [noMatch, setNoMatch] = useState(false);

    async function handleSubmit(e){

        e.preventDefault();
        if(!name || !email || !password || !confirmPass){

            setErrorMsg('Error! ❌ All inputs must be filled out!');
        }else{

            if(password !== confirmPass){

                setNoMatch(true); 
            }else{

                setNoMatch(false);
                
                if(!isRegisted){
                    setIsRegisted(true);
                    await doCreateUserWithEmailAndPassword(email, password);
                }
            }
        }

        setTimeout(()=>{
            setErrorMsg(null);
        }, 2000);
    }

    return <div className="login-page">

        {errorMsg !== null && <p className="error">{errorMsg}</p>}

        {isRegisted && (<Navigate to={'/login'} replace={true} />)}

        {userLoggedIn && (<Navigate to={'/'} replace={true} />)}

        <h1>Create Account</h1>
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <div className="row">
                    <input type="text" placeholder="Please enter your name" value={name} onChange={(e)=>setName(e.target.value)} />
                </div>
            </label>
            <label>
                Email:
                <div className="row">
                    <input type="email" placeholder="Please enter your email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                </div>
            </label>
            <label>
                Password:
                <div className="row">
                    <input type="password" placeholder="Please eneter your password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                </div>
            </label>
            <label>
                <div className="confirm">
                    <input type="password" placeholder="Confirm password" value={confirmPass} onChange={(e)=>setConfirmPass(e.target.value)} />
                    {noMatch ? <span style={{color: 'red'}}>The passwords don't match</span> : null}
                </div>
            </label>
            <div className="form-btn">
                <button type="submit">Sign Up</button>
            </div>
        </form>
        <div className="register-sect">
            Alredy have an account?
            <Link to='/login'>Login Here</Link>
        </div>
    </div>
}