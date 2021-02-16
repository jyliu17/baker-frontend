import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import BakersList from "./BakersList";
import BakerPage from "./BakerPage";
import Favorites from "./Favorites";
import Login from "./Login";
import Signup from "./Signup";


function App() {

  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  console.log(currentUser);

  // // autologin
  useEffect(() => {
    //   // TODO: check if there'a token for the logged in user
    fetch("http://localhost:3000/self")
      .then((r) => r.json())
      .then((user) => {
        setCurrentUser(user);
      });
  }, []);

  // console.log(currentUser);
  const API = "http://localhost:3000/bakers";
  const favAPI = "http://localhost:3000/favorites"

  const [bakersState, setBakersState] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [bakerSearch, setBakerSearch] = useState("");
  const [favoriteBakersState, setFavoriteBakersState] = useState([]);


  useEffect(() => {
    fetch(API)
      .then(r => r.json())
      .then(bakersArray => {
        setBakersState(bakersArray);
      })
  }, []);


  // function setFavSt(bakersIds) {
  //   setFavoriteBakersState(bakersIds);
  // };


  function handleAddFav(addedBaker) {
    // favIndex = addedBaker.id 
    // console.log(favArr[addedBaker.(Math(addedBaker.id - 1))]);
    // let arr = favArr.filter((f) => f.baker.id === addedBaker.id);
    // let favId = arr[0].id;

    let objData = { user_id: currentUser.id, baker_id: addedBaker.id };
    if (favoriteBakersState.includes(addedBaker)) {
      fetch(`${favAPI}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(objData),
      })
        .then(r => r.json())
        .then(objData => renderFav(objData))
    }
  };

  function renderFav(objData) {
    const newFavs = [...favoriteBakersState, objData];
    // console.log(newF)
    setFavoriteBakersState(newFavs);
  }


  function handleRemoveFav(removedBaker) {
    //**optimistic rendering**
    const removeArr = favoriteBakersState.filter(fav => fav.baker_id !== removedBaker.id)
    setFavoriteBakersState(removeArr);
    // console.log(newF)
    // let user2 = {
    //   "id": 2,
    //   "username": "noura",
    //   "favorites": [{ "id": 3, "user_id": 2, "baker_id": 2 }, { "id": 4, "user_id": 2, "baker_id": 3 }]
    // };

    //to test
    let favToDelete = currentUser.favorites.filter(fav => fav.baker_id === removedBaker.id);
    // console.log(favToDelete[0]);
    const id = favToDelete[0].id;
    // console.log(id);
    fetch(`${favAPI}/${id}`, {
      method: 'Delete',
    });

  };

  function onRemoveFromFav(favBaker) {
    // const removeArr = favoriteBakersState.filter(fav => fav.baker_id !== favBaker.id)
    // setFavoriteBakersState(removeArr);

    // let favorite = currentUser.favorites.filter(fav => fav.id === favBaker.id);
  console.log(favBaker);
   
    // console.log(favId);
    // const id = fav[0].id;
    // console.log(id);
    // fetch(`${favAPI}/${id}`, {
    //   method: 'Delete',
    // });
  }

  const filteredBakers = bakersState.filter((baker) => {
    return baker.name.toLowerCase().includes(bakerSearch.toLowerCase())
  });
  // console.log(favoriteBakersState);

  function handleAddBaker(newBaker) {
    const newBakerList = ([...bakersState, newBaker])
    setBakersState(newBakerList)
  }

  function handleFormClick() {
    setShowForm(showForm => !showForm)
  }

  function handleUpdateBaker(updatedBaker) {
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
      <NavBar currentUser={currentUser} setCurrentUser={setCurrentUser}></NavBar>
      <main>
        <Switch>
          <Route path="/login">
            <Login currentUser={currentUser} setCurrentUser={setCurrentUser} />
          </Route>
          <Route path="/signup">
            <Signup currentUser={currentUser} setCurrentUser={setCurrentUser} />
          </Route>
          <Route path="/bakers/:id">
            <BakerPage handleUpdateBaker={handleUpdateBaker} />
          </Route>
          <Route path="/bakers">
            <BakersList bakersState={filteredBakers}
              bakerSearch={bakerSearch}
              setBakerSearch={setBakerSearch}
              handleAddBaker={handleAddBaker}
              handleFormClick={handleFormClick}
              setShowForm={setShowForm}
              showForm={showForm}
              onAdded={handleAddFav}
              onRemoved={handleRemoveFav} />
          </Route>
          <Route path="/favorites">
            <Favorites key='myFav'
              favoriteBakersState={favoriteBakersState}
              setFavoriteBakersState={setFavoriteBakersState}
              favAPI={favAPI}
              onRemoveFromFav={onRemoveFromFav}
              currentUser={currentUser} />
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default App;
