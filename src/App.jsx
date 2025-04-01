import React, { useState } from "react";

import Card from "./Card";
import Papa from "papaparse";
import "./Card.css";

const App = () => {
  const [profile, setProfile] = useState([]);
  const [show, setShow] = useState(false);

  const handleData = (result) => {
    const { data, errors } = result;
    if (errors.length > 0) {
      alert("Error");
      return;
    }
    console.log(data);
    setProfile(data);
    setShow(true);
  };
  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    Papa.parse(file, {
      header: true,
      complete: handleData,
    });
  };

  //use a parser to read csv here we use papaparse

  return (
    <>
      <div>
        {show == false ? (
          <div className="upload-container">
            <h1>Upload CSV here</h1>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              id="file-upload"
              className="file-input"
            />
            <label htmlFor="file-upload" className="file-label">
              Choose File
            </label>
          </div>
        ) : (
          
          <div className="container">
            
           
            {profile.map((elem, idx) => {
              return (
                <Card
                  key={idx}
                  name={elem.name}
                  email={elem.email}
                  github={elem.githubLink}
                />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default App;