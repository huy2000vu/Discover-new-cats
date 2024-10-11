import React, { useState } from "react";
const access_key = import.meta.env.VITE_ACCESS_KEY;
import "./App.css";

export default function App() {
  let query = "";
  const [catImg, setcatImg] = useState(null);
  const [name, setname] = useState(null);
  async function fetch_Random_Breed() {
    const response = await fetch("https://api.thecatapi.com/v1/breeds");
    const json = await response.json();
    // console.table(json);
    const randomBreed = json[Math.floor(Math.random() * json.length)];
    console.log(`Random Breed ID: ${randomBreed.id}`);
    return randomBreed.id;
  }
  function buildquery() {
    let breed_id = fetch_Random_Breed();
    let imgHeight = 0;
    let imgWidth = 0;
    query = `https://api.thecatapi.com/v1/images/search?&api_key=${access_key}`;
  }

  async function callAPI() {
    buildquery();
    const response = await fetch(query);
    const json = await response.json();

    if (json.length <= 0) {
      alert("something is wrong, check the callAPI()");
    } else {
      setcatImg(json[0].url);
    }
    console.table(json); //for debugging; delete when the project is complete
    // console.log(json[0].url);
  }

  return (
    <div className="main">
      <div className="center">
        <h1 className="title">discover new cats🐈</h1>
        {catImg ? (
          <img src={catImg} className="catImg" alt="picture of a cat" />
        ) : (
          <div />
        )}
        <button onClick={callAPI}>Get a cat</button>
      </div>
    </div>
  );
}
