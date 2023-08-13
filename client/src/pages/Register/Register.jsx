import { useContext, useState } from "react";
import "./register.css"
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        email: undefined,
        password: undefined
    });

    const { loading, error, dispatch } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }

    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "REGISTER_START" });
        try {
            const res = await axios.post("/auth/register", credentials);
            dispatch({ type: "REGISTER_SUCCESS", payload: res.data });
            navigate("/");
        } catch (error) {
            dispatch({ type: "REGISTER_FAILURE", payload: error.response.data });
        }
    }

    return (
        <div className="register">
            <div className="logo-container">
                <Link to="/" style={{ color: "inherit", textDecoration: "none", fontSize: "30px" }}>
                    <span className="logo">Bookinnnng</span>
                </Link>
            </div>
            <div className="register-container">
                <div className="register-wrapper">
                    <input type="text" placeholder="username" id="username" onChange={handleChange} className="register-input" />
                    <input type="email" placeholder="email" id="email" onChange={handleChange} className="register-input" />
                    <input type="passsword" placeholder="password" id="password" onChange={handleChange} className="register-input" />
                    <button disabled={loading} onClick={handleClick} className="register-button">
                        Register
                    </button>
                    <span>Already registered?<Link to='/login'>Login</Link> </span>
                    {error && <span>{error.message}</span>}
                </div>
            </div>
        </div>
    )
}

export default Register