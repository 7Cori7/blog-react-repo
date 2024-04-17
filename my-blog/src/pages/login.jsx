import { Link } from "react-router-dom";

export default function LoginPage(){

    return <div className="login-page">
        <h1>Login</h1>
        <form>
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