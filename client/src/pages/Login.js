import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [credentials, setcredentials] = useState({
    email: " ",
    password: "",
  });
  const handleSubmit = async (event) => {
    event.preventDefault(); //Synthetic Event
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("Enter Valid Credentials");
    } else {
      alert("User Logged SuccessFully!!");
      localStorage.setItem("UserEmail",credentials.email);
      console.log("Email in the login is:",credentials.email);
      localStorage.setItem("authToken",json.authToken);
      window.location="/";
    }
  };
  const Onchange = (event) => {
    setcredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <div>
      <Container>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 mt-2">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              name="email"
              value={credentials.email}
              aria-describedby="emailHelp"
              onChange={Onchange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={credentials.password}
              onChange={Onchange}
            />
          </div>
          <div>
            <Button type="submit" className="btn btn-primary btn-success mb-3 m-1">
              Submit
            </Button>
            <Button
              onClick={() => {
                navigate("/signup");
              }}
              className="btn btn-primary btn-success mb-3 m-1"
            >
              New User?Sign Up
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default Login;
