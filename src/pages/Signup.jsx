import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../FireBase";
import "./Signup.css";

import { GoogleAuthProvider , signInWithPopup } from "firebase/auth";

const auth = getAuth(app);

//instace of google provider
const provider = new GoogleAuthProvider();


function Signup() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const[loading , setLoading] = useState(false);

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

  const signUpWithGoogle = async () =>{
    try {

      setLoading(true);
     const result =  await signInWithPopup(auth ,provider);
     console.log("result : " , result);

    } catch (error) {
      setMessage(error.message);
      
    }finally{
      setLoading(false);
    }
  }
  


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
        <button onClick={()=>{
          signUpWithGoogle();
        }}>{
          loading ? "loading..." : "SignUp With Google"
        }</button>


        {message  && <p className="message">{message}</p>}
        


      </form>
    </div>
  );
}

export default Signup;