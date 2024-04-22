import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { doSignOut } from "../firebase/auth";
import { useState } from "react";

export default function NavBar(){

    const { userLoggedIn, currentUser } = useAuth();

    const [openMenu, setOpenMenu] = useState(false);

    const navigate = useNavigate();

    function handleLogout(){

        if(openMenu){

            setOpenMenu(false);
        }

        doSignOut().then(()=>{

            navigate('/login'); 
        });
    };

    return <header>
        <nav>
            {
                userLoggedIn
                ? <div className="display-user">{currentUser.diplayName ? currentUser.displayName : currentUser.email}</div>
                : null
            }
            
            <ul className="pc-nav">
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

            <div className="mobile-menu">
                <h3>My Blog</h3>
                <button onClick={()=>setOpenMenu( menu => !menu ? true : false )}>
                    {
                        openMenu ? <span className="material-symbols-outlined">close</span>
                        :<span className="material-symbols-outlined">menu</span>
                    }
                </button>
                {
                    openMenu &&
                    <div className="mobile-menu-list">
                        <ul>
                            <li>
                                <Link to='/' onClick={()=>setOpenMenu(false)}>Home</Link>
                            </li>
                            <li>
                                <Link to='/articles' onClick={()=>setOpenMenu(false)}>Articles</Link>
                            </li>
                            <li>
                                <Link to='/about' onClick={()=>setOpenMenu(false)}>About</Link>
                            </li>
                            <li>
                                {
                                    userLoggedIn
                                    ? <Link onClick={handleLogout}>Logout</Link>
                                    : <Link to='/login' onClick={()=>setOpenMenu(false)}>Login</Link>
                                }
                            </li>
                        </ul>
                    </div>
                }
                
            </div>
        </nav>
    </header>
}