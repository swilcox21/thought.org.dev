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

function Reminders() {
  const [reminder, setReminder] = useState("");
  const [reminderList, setReminderList] = useState([]);
  const [editReminder, setEditReminder] = useState("");

  useEffect(() => {
    getReminders();
  }, []);

  // axios get, post, put, delete functions
  const getReminders = async () => {
    await axios
      .get(`/reminders/`, {})
      .then((res) => {
        const data = res.data;
        console.log(data.results);
        setReminderList(data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const postReminder = async () => {
    await axios
      .post(`/reminders/`, {
        message: reminder,
      })
      .then(function (res) {
        console.log(res);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(getReminders)
      .then(resetTextArea);
  };
  const putReminder = async (changes, id) => {
    await axios
      .put(`/reminders/${id}`, changes)
      .then(function (res) {
        console.log(res);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(getReminders)
      .then(resetTextArea);
  };
  const deleteReminder = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/reminders/${id}/`);
  };

  function resetTextArea() {
    setReminder("");
  }

  // the textarea to add reminders with submit button
  return (
    <>
      <div className="d-flex justify-content-center mb-3">
        <TextareaAutosize
          className=" borderBottom p-2"
          placeholder="Type reminder here"
          type="text"
          value={reminder}
          onChange={(e) => setReminder(e.target.value)}
        />
      </div>
      <button type="submit" onClick={postReminder}>
        SUBMIT
      </button>
      <div className="container mt-3">
        {reminderList &&
          reminderList.map((r) => (
            <div key={r.id} className="d-flex justify-content-between">
              <TextareaAutosize
                onChange={(e) => setEditReminder(e.target.value)}
                onBlur={() => {
                  let changes = {
                    date_time: r.date_time,
                    message: editReminder,
                  };
                  putReminder(changes, r.id);
                }}
                type="text"
                className="col-11 onfucus unfucused"
              >
                {r.message}
              </TextareaAutosize>
              <button
                onClick={() => {
                  deleteReminder(r.id).then(getReminders);
                }}
              >
                x
              </button>
            </div>
          ))}
      </div>
    </>
  );
}

export default Reminders;

// ***** NOTE *****
// will add later to be able to create new folders beyond just reminders

// input with datalist dropdown for folder selection
// <input
//  className="borderBottomRight col-3 p-2"
//  placeholder="reminders"
//  value="reminders"
//  onBlur={() => {
//    folder === "" && setFolder("reminders");
//    folder === "" && setNewFolder("reminders");
//    setFolderValue("");
//  }}
//  onChange={(e) => {
//    setFolder(e.target.value);
//    setFolderValue(e.target.value);
//    setNewFolder(e.target.value);
//  }}
//  list="folders"
//  name="folder"
//  id="folder"
// />

// datalist for the above input
/* <datalist id="folders">
{dummyFolders.map((folder) => (
  <div key={folder.id}>
    <option value={folder.label} />
  </div>
))}
</datalist> */
