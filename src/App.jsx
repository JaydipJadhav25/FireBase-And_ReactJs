import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

import { getDatabase, ref, set } from "firebase/database";

//instace of firease app
import { app } from "./FireBase";
import { useState } from "react";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";

const db = getDatabase(app); //this is retrn instace of database



function App() {
  const [user, setUser] = useState({
    id: null,
    name: null,
  });


  function setUserData(obj){
    //set state val
    console.log("log : " , obj);

    setUser(prev => {
      return {...prev , [obj.target.name] : obj.target.value}
    });
  };



  //function
  const putData = () => {
      
    //check condition name is not null
    if(user.name == null) alert("All data requried !");

    console.log("user : " , user);

    set(ref(db, `user/${user.name}`), {
     ...user
    });

  };




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
        <input type="number" name="id" onChange={e => setUserData(e)}/>
        <label htmlFor="">Name : </label>
        <input type="text" name="name"  onChange={e => setUserData(e)}/>


        <button onClick={()=>{
          putData();
        }}>create</button>
        
      </section>

      <div className="ticks"></div>
      <section id="spacer">
        <h1> Firebase React Authentication</h1>

        <Signup/>

        <hr />

        <Signin/>

      </section>
    </>
  );
}

export default App;
