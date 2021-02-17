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
  const [bakersState, setBakersState] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [bakerSearch, setBakerSearch] = useState("");
  const [favoriteBakersState, setFavoriteBakersState] = useState([]);
  const [favs, setFavs] = useState([]);

  // // autologin
  useEffect(() => {
    //   // TODO: check if there'a token for the logged in user
    fetch("http://localhost:3000/self")
      .then((r) => r.json())
      .then((user) => {
        setCurrentUser(user);
      });
  }, []);

  const API = "http://localhost:3000/bakers";
  useEffect(() => {
    fetch(API)
      .then(r => r.json())
      .then(bakersArray => {
        setBakersState(bakersArray);
      })
  }, []);

  useEffect(() => {
    if (currentUser) {
    fetch(`${API}/${currentUser.id}`)
        .then(r => r.json())
        .then(userObj=> {
            setFavs(userObj.favorites)
        })
    }
}, []);
console.log(favs);

// function getUserFavs(favArray) {
//   const userFavArray = favArray.filter(fav => fav.user_id === currentUser.id);
//   // const bakersArray = userFavArray.map((fav) => fav.baker);
//   setFavs(userFavArray);
// };



  function handleAddFav(addedBaker) {
    // console.log(addedBaker);
    let bakerId = addedBaker.id;
    let userId = currentUser.id;
    console.log(userId);
    console.log(bakerId);
    let objData = { user_id: currentUser.id, baker_id: addedBaker.id };
    console.log(objData)
    if (favoriteBakersState.find(b => b.id === addedBaker.id) !== void 0) {
      alert('The selected baker already exists in your favorite!');
    } else {
      fetch(`http://localhost:3000/favorites`, {
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

    let favToDelete = currentUser.favorites.filter(fav => fav.baker_id === removedBaker.id);
    // console.log(favToDelete[0]);
    const id = favToDelete[0].id;
    // console.log(id);
    fetch(`http://localhost:3000/favorites/${id}`, {
      method: 'Delete',
    });

  };

  function onRemoveFromFav(favorite) {
    const removeArr = favoriteBakersState.filter(fav => fav.baker_id !== favorite.id)
    setFavoriteBakersState(removeArr);
  };

  const filteredBakers = bakersState.filter((baker) => {
    return baker.name.toLowerCase().includes(bakerSearch.toLowerCase())
  });

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
              onRemoved={handleRemoveFav}
              currentUser={currentUser}
              favoriteBakersState={favoriteBakersState} 
              favs={favs}
              setFavs={setFavs} />
          </Route>
          <Route path="/favorites">
            <Favorites
              key='myFav'
              favoriteBakersState={favoriteBakersState}
              setFavoriteBakersState={setFavoriteBakersState}
              onRemoveFromFav={onRemoveFromFav}
              currentUser={currentUser}
              favs={favs} />
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default App;
