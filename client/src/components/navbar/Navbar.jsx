import { useContext } from "react";
import "./navbar.css"
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
    const { user, dispatch } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        navigate('/');
    }
    const handleLogin = () => {
        navigate('/login');
    }
    const handleRegister = () => {
        navigate('/register');
    }
    return (
        <div className="navbar">
            <div className="navbar-container">
                <Link to="/" style={{ color: "inherit", textDecoration: "none", fontSize: "30px" }}>
                    <span className="logo">Bookinnnng</span>
                </Link>
                {user
                    ? <div className="navbar-user-details">
                        {user.username}
                        <button onClick={handleLogout} className="navbar-button">Log-Out</button>
                    </div>

                    : <div className="navbar-items">
                        <button onClick={handleRegister} className="navbar-button">Register</button>
                        <button onClick={handleLogin} className="navbar-button">Login</button>
                    </div>}
            </div>
        </div>
    )
}

export default Navbar