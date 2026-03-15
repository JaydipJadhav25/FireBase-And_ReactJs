import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../FireBase";
import "./Signup.css";

const auth = getAuth(app);

function Signup() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const signUpUser = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setMessage("Account Created Successfully ✅");
      console.log(userCredential.user);

    } catch (error) {

      setMessage(error.message);
    }
  };

  return (
    <div className="signup-container">

      <form className="signup-box" onSubmit={signUpUser}>
        <h2 style={{color : "red"}}>Create Account</h2>

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

        <button type="submit">Sign Up</button>

        {message && <p className="message">{message}</p>}
      </form>

    </div>
  );
}

export default Signup;