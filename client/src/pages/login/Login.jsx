import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [err, setErr] = useState(null);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login(inputs);
      if (res?.error) {
        console.log(err);
        setErr(res.error);
      } else {
        navigate("/")
      }
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>NG-SM</h1>
          <p>
            Welcome to NG-Social Media where you can share your interests,
            connect with friends, and find new like-minded individuals.
            Log in to your account to start an exciting journey through the world of social interactions.
          </p>
          <span>Don't you have an account?</span>
          <span>
            <Link to="/register">
              <button>Register</button>
            </Link>
          </span>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <span>
              {err}
            </span>
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
