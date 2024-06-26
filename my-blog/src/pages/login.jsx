import { Link, Navigate } from "react-router-dom";
import { doSignInWithEmailAndPassword } from "../firebase/auth.js";
import { useState } from "react";
import { useAuth }  from "../contexts/authContext/index.jsx";
import Message from "../components/message.jsx";

export default function LoginPage(){

    const { userLoggedIn } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(false);

    async function handleLogin(e){

        try {

            e.preventDefault();
            if(!email || !password){
                setError(true);
                setMessage('Error! ❌ All inputs must be filled out!');
            }else{

                if(!userLoggedIn){

                    setError(false);
                    await doSignInWithEmailAndPassword(email, password);
                }
            }

        } catch (error) {
            console.log(error)
            setError(true);
            setMessage('Error! ❌ The user or the password are wrong');
        }

        setTimeout(()=>{
            setMessage(null);
            setError(false);
        }, 2000);
    }

    return <div className="login-page">

        {userLoggedIn && (<Navigate to={'/'} replace={true} />)}

        {message !== null && <Message error={error} message={message} />}

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