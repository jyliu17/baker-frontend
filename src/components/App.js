import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import BakersList from "./BakersList";
import BakerPage from "./BakerPage";


function App() {
  // const [currentUser, setCurrentUser] = useState(null);

  // // autologin
  // useEffect(() => {
  //   // TODO: check if there'a token for the logged in user
  //   // GET /me
  //   fetch("http://localhost:3000/me")
  //     .then((r) => r.json())
  //     .then((user) => {
  //       // set the user in state
  //       setCurrentUser(user);
  //     });
  // }, []);

  // console.log(currentUser);
  const API = "http://localhost:3000/bakers";
  const [bakersState, setBakersState] = useState([]);

  useEffect(() => {
    fetch(API)
    .then(r => r.json())
    .then(bakersArray => (setBakersState(bakersArray)))
  }, []);
  
  // console.log(bakersState);

  return (
    <>
      <NavBar />
      <main>
        <Switch>
           <Route path="/bakers/:id">
              <BakerPage />
          </Route>
          <Route path="/bakers">
            <BakersList bakersState={bakersState} API={API} />
          </Route>
         
        </Switch>
      </main>
    </>
  );
}

export default App;
