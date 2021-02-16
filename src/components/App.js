import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import BakersList from "./BakersList";
import BakerPage from "./BakerPage";
import Favorites from "./Favorites";


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
  const favAPI = "http://localhost:3000/favorites"

  const [bakersState, setBakersState] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [bakerSearch, setBakerSearch] = useState("");
  const [favoritesState, setFavoritesState] = useState([]);
  const [favArr, setFavArr] = useState({});


  useEffect(() => {
    fetch(API)
      .then(r => r.json())
      .then(bakersArray => {
        setBakersState(bakersArray);
        setFavArr(bakersArray.map(b => b.favorites))
      })
  }, []);


  function setFavSt(bakersIds) {
    setFavoritesState(bakersIds);
  };


  function handleAddFav(addedBaker) {
    // favIndex = addedBaker.id 
    // console.log(favArr[addedBaker.(Math(addedBaker.id - 1))]);
    // let arr = favArr.filter((f) => f.baker.id === addedBaker.id);
    // let favId = arr[0].id;

    let objData = { user_id: parseInt('1'), baker_id: addedBaker.id };

    fetch(`${favAPI}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(objData),
    })
      .then(r => r.json())
      .then(obj => console.log(obj))

    const newFavs = [...favoritesState, addedBaker];
    // console.log(newF)
    setFavoritesState(newFavs);
  };


  function handleRemoveFav(removedBaker) {
    // console.log(newF)
    let user2 = {
      "id": 2,
      "username": "noura",
      "favorites": [{ "id": 3, "user_id": 2, "baker_id": 2 }, { "id": 4, "user_id": 2, "baker_id": 3 }]
    };
    let favToDelete = user.favorites.filter(fav => fav.baker_id === removedBaker.id);
    console.log(favToDelete);
    const id = favToDelete.id;
    fetch(`${favAPI}`, {
      method: 'Delete',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const removeArr = favoritesState.filter(fav => fav !== removedBaker)
    setFavoritesState(removeArr);
  };

  const filteredBakers = bakersState.filter((baker) => {
    return baker.name.toLowerCase().includes(bakerSearch.toLowerCase())
  });
  // console.log(favoritesState);

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
      <NavBar />
      <main>
        <Switch>
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
              onRemoved={handleRemoveFav}
            />
          </Route>
          <Route>
            <Favorites setFavSt={setFavSt} favoritesState={favoritesState} favAPI={favAPI} key='myFav' />
          </Route>

        </Switch>
      </main>
    </>
  );
}

export default App;
