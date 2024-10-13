import React, { useState } from "react";
const access_key = import.meta.env.VITE_ACCESS_KEY;
import "./App.css";
import History from "./components/History";
import Banlist from "./components/Banlist";

export default function App() {
  let query = "";
  const [banList, setbanList] = useState([]);
  const [catImg, setcatImg] = useState(null);
  const [info, setinfo] = useState(null);
  const [attributes, setattributes] = useState(null);
  const [prevCat, setprevCat] = useState([]);

  function handleRemoveAttr(buttonName) {
    setbanList((prevList) => prevList.filter((e) => e !== buttonName));
  }
  function handleAttributeButton(event) {
    const buttonName = event.target.textContent;
    if (!banList.includes(buttonName)) {
      setbanList((prevAttribute) => [...prevAttribute, buttonName]);
    }
    console.log(buttonName);
    console.log(`banlist: ${banList}`);
  }
  async function fetch_Random_Breed() {
    try {
      const response = await fetch("https://api.thecatapi.com/v1/breeds");
      const json = await response.json();
      const randomBreed = json[Math.floor(Math.random() * json.length)];
      return randomBreed.id;
    } catch (e) {
      console.log(e);
    }
  }

  async function callAPI() {
    try {
      const randomBreed = await fetch_Random_Breed();
      if (randomBreed) {
        const query = `https://api.thecatapi.com/v1/images/search?limit=1&breed_id=${randomBreed}&api_key=${access_key}`;
        const response = await fetch(query);
        const json = await response.json();
        if (json.length <= 0) {
          alert("something is wrong, check the callAPI()");
        } else {
          console.log(json[0]); //debug
          // console.log(json[0].breeds[0].life_span); //debug
          setcatImg(json[0].url);
          setattributes({
            name: json[0].breeds[0].name,
            origin: json[0].breeds[0].origin,
            life_span: json[0].breeds[0].life_span,
            weight: json[0].breeds[0].weight.imperial,
          });
          const newCat = {
            image: json[0].url,
            description: `A ${json[0].breeds[0].name} cat from ${json[0].breeds[0].origin}`,
          };
          setprevCat((cats) => [...cats, newCat]);
          // setprevDescription((description) => [
          //   ...description,
          //   `A ${attributes.name} cat from ${attributes.origin}`,
          // ]);
          // console.log(attributes);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="main">
      <History catList={prevCat} />
      <div className="center">
        <h1 className="title">discover new cats🐈</h1>
        {catImg ? (
          <img src={catImg} className="catImg" alt="picture of a cat" />
        ) : (
          <div />
        )}
        {attributes && (
          <div className="attributesButton">
            <button onClick={handleAttributeButton}>{attributes.name}</button>
            <button onClick={handleAttributeButton}>{attributes.origin}</button>
            <button onClick={handleAttributeButton}>
              {attributes.life_span} years
            </button>
            <button onClick={handleAttributeButton}>
              {attributes.weight} lbs
            </button>
          </div>
        )}
        <button onClick={callAPI} className="get_a_cat_button">
          Get a new cat
        </button>
      </div>
      <Banlist bannedList={banList} removeFromBanList={handleRemoveAttr} />
    </div>
  );
}
