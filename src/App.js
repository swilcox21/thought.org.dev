import React from "react";
import "./App.css";
import AddThought from "./components/addThought";
import Folder from "./components/Folder";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfinity } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <h1>
        You and me forever <FontAwesomeIcon icon={faInfinity} />
      </h1>
      <br />
      <AddThought />
      <Folder />
    </div>
  );
}

export default App;
