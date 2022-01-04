import React, { useState } from "react";
import "./compCss.css";
import TextareaAutosize from "react-textarea-autosize";

// some dummy Data to test the state
const dummyFolders = [
  {
    id: 1,
    label: "thoughts",
  },
  {
    id: 2,
    label: "testFolder",
  },
];

function AddThought() {
  const [folder, setFolder] = useState("thoughts");
  const [folderValue, setFolderValue] = useState("");
  const [newFolder, setNewFolder] = useState("");
  const [thought, setThought] = useState("");

  const dummyNewFolder =
    folder === newFolder
      ? dummyFolders.filter((folder) => folder.label !== folder.label) === []
        ? newFolder
        : null
      : null;
  return (
    <div className="container-fluid">
      <div className="d-flex mt-3 mx-auto mb-3">
        <input
          onBlur={() => setFolderValue("")}
          className="borderBottomRight col-3 col-md-3"
          placeholder={folder}
          value={folderValue}
          onChange={(e) => {
            setFolder(e.target.value);
            setFolderValue(e.target.value);
            setNewFolder(e.target.value);
          }}
          list="folders"
          name="folder"
          id="folder"
        />
        <datalist id="folders">
          {dummyFolders.map((folder) => (
            <div key={folder.id}>
              <option value={folder.label} />
            </div>
          ))}
        </datalist>
        <TextareaAutosize
          className="pl-2 col-md-11 activeTodo onfucus addNew py-3"
          placeholder="Type your thoughts"
          type="text"
          value={thought}
          onChange={(e) => setThought(e.target.value)}
        />
      </div>
      <button
        type="submit"
        onClick={() => {
          newFolder !== ""
            ? console.log(dummyNewFolder)
            : console.log("no new Folder");
        }}
      >
        SUBMIT
      </button>
    </div>
  );
}

export default AddThought;
