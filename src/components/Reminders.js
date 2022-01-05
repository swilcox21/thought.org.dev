import React, { useState, useEffect } from "react";
import "../App.css";
import TextareaAutosize from "react-textarea-autosize";
import axios from "../axios";

// some dummy Data to test the state

//                NOTES!!
// if the user types into the folder field this function will check if that folder exists already so it doesnt get created twice
// const dummyNewFolder = Array.isArray(dummyFolders)
//   ? dummyFolders.filter((folder) => folder.label === newFolder)
//   : [];

// the folder drop down and textarea to add reminders and thoughts with submit button
function Reminders() {
  const [reminder, setReminder] = useState("");
  const [reminderList, setReminderList] = useState([]);

  function getData() {}

  useEffect(() => {
    axios
      .get(`/reminders/`, {})
      .then((res) => {
        const data = res.data;
        console.log(data.results);
        setReminderList(data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="d-flex justify-content-center mb-3">
        <input
          className="borderBottomRight col-3 p-2"
          placeholder="reminders"
          value="reminders"

          // ***** NOTE *****
          // will add later to be able to create new folders beyond just reminders

          // onBlur={() => {
          //   folder === "" && setFolder("reminders");
          //   folder === "" && setNewFolder("reminders");
          //   setFolderValue("");
          // }}
          // onChange={(e) => {
          //   setFolder(e.target.value);
          //   setFolderValue(e.target.value);
          //   setNewFolder(e.target.value);
          // }}
          // list="folders"
          // name="folder"
          // id="folder"
        />

        {/* ***** NOTE ***** */}
        {/* will add later to be able to create new folders beyond just reminders */}

        {/* <datalist id="folders">
          {dummyFolders.map((folder) => (
            <div key={folder.id}>
              <option value={folder.label} />
            </div>
          ))}
        </datalist> */}
        <TextareaAutosize
          className="activeTodo onfucus borderBottom p-2"
          placeholder="Type your thoughts"
          type="text"
          value={reminder}
          onChange={(e) => setReminder(e.target.value)}
        />
      </div>
      <button
        type="submit"
        // onClick={}
      >
        SUBMIT
      </button>
      <ul className="container mt-3">
        {reminderList &&
          reminderList.map((r) => (
            <li key={r.id} className="d-flex justify-content-between">
              <div>{r.message}</div>
              <button>x</button>
            </li>
          ))}
      </ul>
    </>
  );
}

export default Reminders;
