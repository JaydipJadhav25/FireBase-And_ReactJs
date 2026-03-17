import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

import { getDatabase, ref, set } from "firebase/database";

//instace of firease app
import { app  } from "./FireBase";
import { useEffect, useState } from "react";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getMessaging, getToken } from "firebase/messaging";
import axios from "axios";

const db = getDatabase(app); //this is retrn instace of database

//auth instance
const auth = getAuth(app);

//instace of messaging
const messagingInstaces = getMessaging(app);

function App() {
  const [user, setUser] = useState({
    id: null,
    name: null,
  });

  const [currestUser, setCurrentUser] = useState(null);

  function setUserData(obj) {
    //set state val
    console.log("log : ", obj);

    setUser((prev) => {
      return { ...prev, [obj.target.name]: obj.target.value };
    });
  }

  //function
  const putData = () => {
    //check condition name is not null
    if (user.name == null) alert("All data requried !");

    console.log("user : ", user);

    set(ref(db, `user/${user.name}`), {
      ...user,
    });
  };

  //to get access of web notifications
  async function requestPermission() {
    console.log("Requesting permission...");
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted.");

        //genrate token
        getToken( messagingInstaces , { vapidKey: "BIUpU9HkA4-SkMPHuiQUjQLmt7UT0q4PhAmHUt0xgmvmEeJS4YJkhZWP3xE3jPL96L9zhoQWvELbwUJyryGze4c" })
          .then(async(currentToken) => {
            if (currentToken) {
              console.log("user token : " , currentToken);
             
              //save in db user
             const response = await axios.post("http://localhost:3000/save-token" , {token : currentToken});
            //  const response = await axios.post("http://localhost:3000/save-token");
             console.log("server reponse : " , response.data);


            } else {
              // Show permission request UI
              console.log(
                "No registration token available. Request permission to generate one.",
              );
            
            }
          })
          .catch((err) => {
            console.log("An error occurred while retrieving token. ", err);
            // ...
          });
      } else if (permission === "denied") {
        alert("Notification permission denied!");
      }
    });
  }

  //check user is login or not
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        //yes user is logined
        console.log("user is logined :", user);
        setCurrentUser(user);
      } else {
        //user => nulll
        //so user is not logined out
        console.log("user is not login :", user);
        setCurrentUser(null);
      }
    });

    requestPermission();
  }, []);

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>

        <h1>FireBase And Reactjs</h1>
        <label htmlFor="">Id : </label>
        <input type="number" name="id" onChange={(e) => setUserData(e)} />
        <label htmlFor="">Name : </label>
        <input type="text" name="name" onChange={(e) => setUserData(e)} />

        <button
          onClick={() => {
            putData();
          }}
        >
          create
        </button>
      </section>

      <div className="ticks"></div>
      <section id="spacer">
        <h1> Firebase React Authentication</h1>

        {!currestUser ? (
          <>
            <Signup />
            <hr />
            <Signin />
          </>
        ) : (
          <>
            <br />
            <h2>hello {currestUser?.displayName || "sir"}</h2>

            <h3>Email : {currestUser.email}</h3>

            <button onClick={() => signOut(auth)}>LogOut</button>
          </>
        )}
      </section>
    </>
  );
}

export default App;
