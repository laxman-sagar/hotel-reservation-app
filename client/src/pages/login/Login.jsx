import { useContext, useState } from "react";
import "./login.css"
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined
    });

    const { loading, error, dispatch } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }

    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post("/auth/login", credentials);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
            navigate("/");
        } catch (error) {
            dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
        }
    }

    return (

        <div className="login">
            <div className="logo-container">
                <Link to="/" style={{ color: "inherit", textDecoration: "none", fontSize: "30px" }}>
                    <span className="logo">Bookinnnng</span>
                </Link>
            </div>

            <div className="login-container">
                <div className="login-wrapper">
                    <input type="text" placeholder="username" id="username" onChange={handleChange} className="login-input" />
                    <input type="password" placeholder="password" id="password" onChange={handleChange} className="login-input" />
                    <button disabled={loading} onClick={handleClick} className="login-button">
                        Login
                    </button>
                    <span>Not registered?<Link to='/register'>Register</Link> </span>
                    {error && <span>{error.message}</span>}
                </div>
            </div>
        </div>
    )
}

export default Login