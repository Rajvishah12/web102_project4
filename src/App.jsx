import { useState } from "react";

import "./App.css";

function App() {
  const [catInfo, setCatInfo] = useState({
    id: "No ID Given",
    name: "No Name Given",
    origin: "No Origin Given",
    life_span: "No Life Span Given",
  });

  const [toIgnore, setToIgnore] = useState([]);
  const [currentImage, setCurrentImage] = useState("https://t4.ftcdn.net/jpg/08/61/16/03/360_F_861160368_4dvdmKSMD9Ye4iiul4x2wmOaKQQSZojV.jpg");

  const makeQuery = () => {
    let query = `https://api.thecatapi.com/v1/images/search?&api_key=live_m2XAa87iP3wwDZIkrNDNms0N7xOE9On1TVqXl30Xonz240h11aWcJdHJDWKHdfWN`;
    return query;
  };

  const callAPI = async () => {

    const response = await fetch(makeQuery())
    const jsonResponse = await response.json();
    let imageURL = jsonResponse[0].url;
    setCurrentImage(imageURL);

    let tempId = "No ID Given";
    let tempName = "No Name Given";
    let tempOrigin = "No Origin Given";
    let tempLifeSpan = "No Life Span Given";
        console.log(jsonResponse[0]);
    console.log(jsonResponse[0].breeds);

    const breedInfo = jsonResponse[0].breeds[0];
    if (breedInfo){
      if (breedInfo.id){
        tempId = breedInfo.id;
      }
      if (breedInfo.name){
        tempName = breedInfo.name;
      }
      if (breedInfo.origin){
        tempOrigin = breedInfo.origin;
      }
      if (breedInfo.life_span){
        tempLifeSpan = breedInfo.life_span;
      }
    }
    let newCatInfo = {
      id: tempId,
      name: tempName,
      origin: tempOrigin,
      life_span: tempLifeSpan,
    };
    console.log(newCatInfo);
    setCatInfo(newCatInfo);
  }

  return (
    <>
      <div className="allContent">
        <div className="mainSection">
          <h1>Cat Picture</h1>
          <button>{catInfo.name}</button>
          <p>{catInfo.origin}</p>
          <p>{catInfo.life_span}</p>
          <div className="imageContainer">
            <img src={currentImage} alt="A Random Cat" />
          </div>
          <button onClick={callAPI}>Discover</button>
        </div>

        <div className="sidePanel">
          <h2>Ban Info</h2>
          <div className="bannedCats"></div>
        </div>
      </div>
    </>
  );
}

export default App;

// https://api.thecatapi.com/v1/images/search?breed_ids!=beng for non bengal cats
// https://api.thecatapi.com/v1/images/search?breed_name!=Bengal for non bengal cats
// https://api.thecatapi.com/v1/images/8pCFG7gCV for more info
// https://thatapicompany.com/a-guide-on-how-to-use-thecatapi/
// https://api.thecatapi.com/v1/images/search?breed_name!=Bengal&breed_name!=Munchkin

// names doesn't work, id does

// name = Bengal
// origin: United States
// hairless: 0 or 1 (1 is hairless)
// rare: 0 or 1 (1 is hairless)
// use ones where length id > 3
// only only one attribute has to be bannable
// api_key=live_m2XAa87iP3wwDZIkrNDNms0N7xOE9On1TVqXl30Xonz240h11aWcJdHJDWKHdfWN
// https://api.thecatapi.com/v1/images/rWr-g-QVX
