import React from "react";
import "./App.css";
// import Folder from "./components/Folder";
import Reminders from "./components/Reminders";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfinity } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="container-fluid col-md-5 text-center">
      <h1>
        Me and you forever <FontAwesomeIcon icon={faInfinity} />
      </h1>
      <br />
      <Reminders />
    </div>
  );
}

export default App;
