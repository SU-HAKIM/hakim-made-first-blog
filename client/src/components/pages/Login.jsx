import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Login({ setToken }) {
  const history = useHistory();
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post("/auth/login", registerData);
      console.log(response.data);

      setToken(response.data.token);
      e.target.reset();
      setRegisterData({
        email: "",
        password: "",
      });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <FormContainer className="row">
        <div className="col-md-6 offset-2">
          <h1 className="display-4 mt-4">Create Blogs</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group my-2">
              <label htmlFor="email">Email :</label>
              <input
                type="email"
                name="email"
                id="title"
                className="form-control"
                value={registerData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group my-2">
              <label htmlFor="password">Password :</label>
              <input
                type="password"
                name="password"
                id="title"
                className="form-control"
                value={registerData.password}
                onChange={handleChange}
              />
            </div>
            <input
              type="submit"
              value="Create"
              className="btn btn-primary mt-3"
            />
          </form>
        </div>
      </FormContainer>
    </div>
  );
}

export default Login;

const FormContainer = styled.div`
  padding-top: 150px;
`;
