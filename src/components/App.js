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
  const [showForm, setShowForm] = useState(false)
  const [bakerSearch, setBakerSearch] = useState("")

  useEffect(() => {
    fetch(API)
    .then(r => r.json())
    .then(bakersArray => (setBakersState(bakersArray)))
  }, []);
  
  // console.log(bakersState);

  const filteredBakers = bakersState.filter((baker) => {
    return baker.name.toLowerCase().includes(bakerSearch.toLowerCase())
  })

  function handleAddBaker(newBaker){
    const newBakerList = ([...bakersState, newBaker])
    setBakersState(newBakerList)
  }

  function handleFormClick(){
    setShowForm(showForm => !showForm)
  }

  function handleUpdateBaker(updatedBaker){
    const updatedBakerList = bakersState.map((baker) => {
      if (baker.id === updatedBaker.id) {
        return updatedBaker;
      } else {
        return bakersState; 
      }
    });
    setBakersState(updatedBakerList);
  }

  return (
    <>
      <NavBar />
      <main>
        <Switch>
           <Route path="/bakers/:id">
              <BakerPage handleUpdateBaker={handleUpdateBaker}/>
          </Route>
          <Route path="/bakers">
            <BakersList bakersState={filteredBakers} 
                        bakerSearch={bakerSearch} 
                        setBakerSearch={setBakerSearch} 
                        handleAddBaker={handleAddBaker}
                        handleFormClick={handleFormClick}
                        setShowForm={setShowForm}
                        showForm={showForm}
                        />
          </Route>
         
        </Switch>
      </main>
    </>
  );
}

export default App;
