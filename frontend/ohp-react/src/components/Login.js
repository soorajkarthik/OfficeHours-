import React from "react";
import { BASE_URL } from "../environment"
import Axios from "axios"

class Login extends React.Component {

  login() {
    const username = document.getElementById("username")
    const password = document.getElementById("password")

    Axios.post(`${BASE_URL}/api/token/`, {
      "username": username.value,
      "password": password.value
    })
      .then((result) => {
        window.sessionStorage.setItem("authToken", result.data.access);
        window.location.replace("/home")
      })
      .catch((_) => alert("Incorrect username or password"));
  }

  toRegistration() {
    window.location.replace("/register")
  }

  render() {
    return (
      <div>
        <input
          type="text"
          id="username"
          placeholder="Username"
          autoComplete="false" />
        <input
          type="password"
          id="password"
          placeholder="Password"
          autoComplete="false"
        />
        <button onClick={this.login}>
          Login
        </button>
        <p onClick={this.toRegistration}>
          No account? Sign Up Here.
        </p>
      </div>
    );
  }
}

export default Login;
