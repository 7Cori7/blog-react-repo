import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { doSignOut } from "../firebase/auth";

export default function NavBar(){

    const { userLoggedIn, currentUser } = useAuth();

    const navigate = useNavigate();

    return <nav>
        
        {
            userLoggedIn
            ? <div className="display-user">{currentUser.diplayName ? currentUser.displayName : currentUser.email}</div>
            : null
        }
        
        <ul>
            <li>
                <Link to='/'>Home</Link>
            </li>
            <li>
                <Link to='/articles'>Articles</Link>
            </li>
            <li>
                <Link to='/about'>About</Link>
            </li>
            <li>
                {
                    userLoggedIn
                    ? <Link onClick={()=>{ doSignOut().then( () => { navigate('/login') } ) }}>Logout</Link>
                    : <Link to='/login'>Login</Link>
                }
            </li>
        </ul>
    </nav>
}