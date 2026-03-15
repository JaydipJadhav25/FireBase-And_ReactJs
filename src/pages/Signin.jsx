import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword  } from "firebase/auth";
import { app } from "../FireBase";
import "./Signup.css";

const auth = getAuth(app);

function Signin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const signUpUser = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword (
        auth,
        email,
        password
      );
      setMessage("User Login Successfully ✅");
      console.log(userCredential.user);

    } catch (error) {

      setMessage(error.message);
    }
  };

  return (
    <div className="signup-container">

      <form className="signup-box" onSubmit={signUpUser}>
        <h2 style={{color : "red"}}>Login Account</h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        {message && <p className="message">{message}</p>}
      </form>

    </div>
  );
}

export default Signin;