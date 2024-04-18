import { Link, Navigate } from "react-router-dom";
import { doSignInWithEmailAndPassword } from "../firebase/auth.js";
import { useState } from "react";
import { useAuth }  from "../contexts/authContext/index.jsx";

export default function LoginPage(){

    const { userLoggedIn } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    async function handleLogin(e){

        e.preventDefault();
        if(!email || !password){

            setErrorMsg('Error! ❌ All inputs must be filled out!');
        }else{

            if(!isLoggedIn){
                setIsLoggedIn(true);
                await doSignInWithEmailAndPassword(email, password);
            }
        }

        setTimeout(()=>{
            setErrorMsg(null);
        }, 2000);
    }

    return <div className="login-page">

        {userLoggedIn && (<Navigate to={'/'} replace={true} />)}
        
        {isLoggedIn && (<Navigate to={'/'} replace={true} />)}

        {errorMsg !== null && <p className="error">{errorMsg}</p>}

        <h1>Login</h1>
        <form onSubmit={handleLogin}>
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
            <div className="form-btn">
                <button type="submit">Login</button>
            </div>
        </form>
        <div className="register-sect">
            Don't have an account yet?
            <Link to='/signup'>Create an Account Here</Link>
        </div>
    </div>
}