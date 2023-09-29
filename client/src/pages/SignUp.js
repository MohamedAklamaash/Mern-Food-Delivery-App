import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [credentials, setcredentials] = useState({
    name: " ",
    email: " ",
    password: "",
    geolocation: " ",
  });

  const handleSubmit = async (event) => {
    event.preventDefault(); //Synthetic Event
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        location: credentials.geolocation,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("Enter Valid Credentials");
    } else {
      alert("User Created SuccessFully!!");
      window.location="/login";
    }
  };
  const Onchange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  return (
    <div>
      <Container>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="Name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={credentials.name}
              onChange={Onchange}
            />
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
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              name="geolocation"
              value={credentials.geolocation}
              onChange={Onchange}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-success mb-3">
            Submit
          </button>
        </form>
        <Link to="/login" className="m-auto  btn btn-danger ">
          Already a User?
        </Link>
      </Container>
    </div>
  );
};

export default SignUp;
