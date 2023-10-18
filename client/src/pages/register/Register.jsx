import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import "./register.scss";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });
  const [err, setErr] = useState(null);
  const navigate = useNavigate()

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const {data} =  await axios.post("http://localhost:5000/api/auth/register", inputs);
      if(data?.error){
        setErr(data.error)
      }else{
        navigate('/login')
      }
    } catch (err) {
      setErr(err.response.data);
    }
  };


  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1> NG Social Media.</h1>
          <p>
            NG-Social Media is an innovative social platform designed to meet the needs of modern users for communication, 
            information exchange, and the creation of communities with shared interests. 
            This social network is created with the latest technologies and user requirements in mind to provide comfortable and safe interaction between users.
          </p>
          <span>Do you have an account?</span>
          <span>
          <Link to="/login">
            <button>Login</button>
          </Link>
          </span>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Surname"
              name="surname"
              onChange={handleChange}
            />
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
            {err && err}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
