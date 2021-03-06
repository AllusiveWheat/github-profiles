import React from "react";
import { Card } from "./Card";
import { User } from "./types/User";
import "./App.css";
// Create a input to enter the name of the user

function App() {
  const [userName, setUserName] = React.useState("AllusiveWheat");
  const [data, setData] = React.useState<User>();
  const APIURL = "https://api.github.com/users/";

  function submitRequest() {
    // Make a request to the server
    // If the request is successful, set the userName to the response
    const res = fetch(APIURL + userName);
    res.then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setData(data);
          console.log(data);
          setUserName(data.name);
        });
      } else if (response.status === 404) {
        setUserName("User not found");
        setData(undefined);
      }
    });
  }

  let card;

  if (data) {
    card = <Card data={data} />;
  }

  return (
    <div className="App">
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button onClick={submitRequest}>Submit</button>
      <div className="flex-col align-bottom">{card}</div>
    </div>
  );
}

// If the userName is not empty, show the user's avatar in a card with the user's name

export default App;
