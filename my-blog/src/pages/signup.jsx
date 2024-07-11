import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { doCreateUserWithEmailAndPassword } from "../firebase/auth";
import axios from "axios";
import Message from "../components/message";

export default function SignUpPage({url}){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [isRegisted, setIsRegisted] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(false);
    const [noMatch, setNoMatch] = useState(false);
    const [users, setUsers] =useState([]);

    async function handleSubmit(e){

        e.preventDefault();

        try {

            if(!name || !email || !password || !confirmPass){

                setError(true);
                setMessage('Error! ❌ All inputs must be filled out!');
            }else{
    
                if(password !== confirmPass){
    
                    setNoMatch(true); 
                }else{
    
                    setNoMatch(false);
                    
                    if(!isRegisted){
    
                        const userExist = users.some(i=> i.email === email);
    
                        if(userExist){
    
                            setError(true);
                            setMessage('Error! ❌ The user\'s email already exist!');
                        }else{
    
                            //* Register user:
                            setError(false);
                            setMessage('The user has been successfully created!');
                            setIsRegisted(true);
    
                            // Firebase auth:
                            await doCreateUserWithEmailAndPassword(email, password);
        
                            // Post to mongoDB endpoint:
                            const obj = {
                                email: email,
                                name: name
                            };
    
                            await axios.post(`${url}/create/user`, obj);
    
                            // Redirect to home page:
                            setTimeout(()=>{
    
                                navigate('/');
                            },2000);
                        }
                    }
                }
            }
            
            // Timeout message popup:
            setTimeout(()=>{
                setMessage(null);
                setError(false);
            }, 2000);
            
        } catch (error) {
            console.log(error)
        }
    };

    //* Get users from api endpoint
    async function getUsers(){

        try {

            const response = await axios.get(`${url}/get/users`);
            const data = response.data;

            if(data){
                setUsers(data.data);
            }
            
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(()=>{

        getUsers();
    }, []);

    //* Function to navigate to home page:
    const navigate = useNavigate();
    
    return <div className="login-page">

        {message !== null && <Message error={error} message={message} />}

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
                    <input type="password" placeholder="Please enter your password" value={password} onChange={(e)=>setPassword(e.target.value)} />
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
            Already have an account?
            <Link to='/login'>Login Here</Link>
        </div>
    </div>
}