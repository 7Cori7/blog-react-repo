import { Link } from "react-router-dom";

export default function SignUpPage(){

    return <div className="login-page">
    <h1>Create Account</h1>
    <form>
        <label>
            Name:
            <div className="row">
                <input type="text" placeholder="Please enter your name" />
            </div>
        </label>
        <label>
            Email:
            <div className="row">
                <input type="email" placeholder="Please enter your email" />
            </div>
        </label>
        <label>
            Password:
            <div className="row">
                <input type="password" placeholder="Please eneter your password" />
            </div>
        </label>
        <label>
            <div className="confirm">
                <input type="password" placeholder="Confirm password" />
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