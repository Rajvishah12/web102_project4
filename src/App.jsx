import { useState } from "react";

import "./App.css";

function App() {
  const [catInfo, setCatInfo] = useState({
    id: "ID",
    name: "Name",
    origin: "Origin",
    life_span: "Life Span",
  });

  // const [toBan, setToBan] = useState([]);
  const [toBan, setToBan] = useState({});
  const [currentImage, setCurrentImage] = useState(
    "https://t4.ftcdn.net/jpg/08/61/16/03/360_F_861160368_4dvdmKSMD9Ye4iiul4x2wmOaKQQSZojV.jpg"
  );
  const [hasInfo, setHasInfo] = useState(false);

  const makeQuery = () => {
    let query = `https://api.thecatapi.com/v1/images/search?&api_key=live_m2XAa87iP3wwDZIkrNDNms0N7xOE9On1TVqXl30Xonz240h11aWcJdHJDWKHdfWN`;

    // wanted to use != for query itself but that isn't built into the API
    // Object.keys(toBan).forEach((breedId) => {
    //   query += `&breed_ids!=${breedId}`;
    // });

    console.log("Query: " + query);
    return query;
  };

  const callAPI = async () => {
    console.log(toBan);

    // keep calling until a cat with breed info is found
    while (!hasInfo) {
      const response = await fetch(makeQuery());
      const jsonResponse = await response.json();
      // checks a breed is given
      if (jsonResponse[0].breeds.length > 0) {
        // checks breed is not banned
        if (!(jsonResponse[0].breeds[0].id in toBan)){
        // update that valid cat has been found
        setHasInfo(true);

        let imageURL = jsonResponse[0].url;
        setCurrentImage(imageURL);

        let tempId = "No ID Given";
        let tempName = "No Name Given";
        let tempOrigin = "No Origin Given";
        let tempLifeSpan = "No Life Span Given";

        const breedInfo = jsonResponse[0].breeds[0];
        if (breedInfo) {
          if (breedInfo.id) {
            tempId = breedInfo.id;
          }
          if (breedInfo.name) {
            tempName = breedInfo.name;
          }
          if (breedInfo.origin) {
            tempOrigin = breedInfo.origin;
          }
          if (breedInfo.life_span) {
            tempLifeSpan = breedInfo.life_span;
          }
        }
        let newCatInfo = {
          id: tempId,
          name: tempName,
          origin: tempOrigin,
          life_span: tempLifeSpan,
        };
        setCatInfo(newCatInfo);
        break;
      }
      }
    }
    setHasInfo(false);
  };

  const addToBanList = () => {
    if ((catInfo.id != "No ID Given") & (catInfo.id != "ID")) {
      const copyToBan = { ...toBan, [catInfo.id]: catInfo.name };
      setToBan(copyToBan);
    }
  };

  const deleteFromBanList = (breedId) => {
    const copyToBan = { ...toBan };
    delete copyToBan[breedId];
    setToBan(copyToBan);
  };

  return (
    <>
      <div className="allContent">
        <div className="mainSection">
          <h1>Cat Picture</h1>
          <button onClick={addToBanList}>{catInfo.name}</button>
          <p>{catInfo.origin}</p>
          <p>{catInfo.life_span}</p>
          <div className="imageContainer">
            <img src={currentImage} alt="A Random Cat" />
          </div>
          <button onClick={callAPI}>Discover</button>
        </div>

        <div className="sidePanel">
          <h2>Ban Info</h2>
          <div className="bannedCats">
            {Object.entries(toBan).map(([breedId, breedName]) => (
              <button key={breedId} onClick={() => deleteFromBanList(breedId)}>
                {breedName}
              </button>
            ))}
          </div>
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
