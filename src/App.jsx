import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

import { getDatabase, ref, set } from "firebase/database";

//instace of firease app
import { app } from "./FireBase";

const db = getDatabase(app); //this is retrn instace of database

function App() {


  //function
  const putData = () => {
    set(ref(db, "user/jaydip"), {
      id: 1,
      name: "jaydip",
      age: 22,
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

        <button
          onClick={() => {
            putData();
          }}
        >
          Put Date
        </button>
      </section>

      <div className="ticks"></div>
      {/* <section id="spacer"></section> */}
    </>
  );
}

export default App;
