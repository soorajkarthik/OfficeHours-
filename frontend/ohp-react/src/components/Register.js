import React from "react";
import { BASE_URL } from "../environment"
import Axios from "axios"

class Register extends React.Component {

  constructor(props) {
    super(props)
    this.register = this.register.bind(this)
  }

  register() {

    const firstName = document.getElementById("first_name")
    const lastName = document.getElementById("last_name")
    const email = document.getElementById("email")
    const password = document.getElementById("password")
    const confirmPassword = document.getElementById("confirm_password")

    if (this.validateFields(firstName, lastName, email, password, confirmPassword)) {
      Axios.post(`${BASE_URL}/api/users/`, {
        "first_name": firstName.value,
        "last_name": lastName.value,
        "email": String(email.value).toLowerCase(),
        "password": password.value
      }).then((result) => {
        Axios.post(`${BASE_URL}/api/token/`, {
          "username": String(email.value).toLowerCase(),
          "password": password.value
        })
          .then((result) => {
            window.sessionStorage.setItem("authToken", result.data.access);
            window.location.replace("/home")
          })
          .catch((_) => alert("Couldn't automatically login. Please do so manually."));
      }).catch((_) => alert("A user with that email already exists!"))
    }
  }

  validateFields(firstName, lastName, email, password, confirmPassword) {
    if (firstName.value === "" || lastName.value === "") {
      alert("Please enter your name")
      return false;
    }

    if (password.value !== confirmPassword.value) {
      alert("Passwords don't match")
      return false;
    }

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(String(email.value).toLowerCase())) {
      alert("Please enter a valid email")
      return false;
    }

    return true;
  }

  toLogin() {
    window.location.replace("/")
  }

  render() {
    return (
      <div>
        <input
          type="text"
          id="first_name"
          placeholder="First Name"
          autoComplete="false" />
        <input
          type="text"
          id="last_name"
          placeholder="Last Name"
          autoComplete="false"
        />
        <input
          type="text"
          id="email"
          placeholder="Email"
          autoComplete="false"
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          autoComplete="false"
        />
        <input
          type="password"
          id="confirm_password"
          placeholder="Confirm Password"
          autoComplete="false"
        />
        <button onClick={this.register}>
          Register
        </button>
        <p onClick={this.toLogin}>
          Have an account? Login Here.
        </p>
      </div>
    );
  }
}

export default Register;
