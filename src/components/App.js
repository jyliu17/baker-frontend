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
  const [favs, setFavs] = useState([]);
  const [isFav, setIsFav] = useState(false);

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

  //   useEffect(() => {
  //     if (currentUser) {
  //     fetch(`${API}/${currentUser.id}`)
  //         .then(r => r.json())
  //         .then(userObj=> {
  //             setFavs(userObj.favorites)
  //         })
  //     }
  // }, []);
  // console.log(favs);

  // function getUserFavs(favArray) {
  //   const userFavArray = favArray.filter(fav => fav.user_id === currentUser.id);
  //   // const bakersArray = userFavArray.map((fav) => fav.baker);
  //   setFavs(userFavArray);
  // };

  // function getBakers(favArray) {
  //   const favBakersArr = favArray.map((f) => f.baker);
  //   setFavoriteBakersState(favBakersArr);
  // };
  // console.log(favoriteBakersState);

  function handleAddFav(addedBaker) {
    // console.log(addedBaker);
    let bakerId = addedBaker.id;
    let userId = currentUser.id;
    let objData = { user_id: userId, baker_id: bakerId };
    if (favs.find(f => f.baker.id === addedBaker.id)) {
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
        .then(favData => renderFav(favData))
    }
  };

  function renderFav(obj) {
    const newFavs = [...favs, obj];
    // console.log(newF)
    setFavs(newFavs);
  }

  function handleRemoveFav(removedBaker) {
    if (favs.length > 0) {
      let favToDelete = favs.find(f => f.baker_id === removedBaker.id);
      const id = favToDelete.id;
      // console.log(id);
      fetch(`http://localhost:3000/favorites/${id}`, {
        method: 'Delete',
      });
    };
    const removeArr = favs.filter(f => f.baker.id !== removedBaker.id)
    setFavs(removeArr);
  };

  function onRemoveFromFav(id) {
    //**optimistic rendering**
    const removeArr = favs.filter(fav => fav.id !== id)
    setFavs(removeArr);

    fetch(`http://localhost:3000/favorites/${id}`, {
      method: 'Delete',
    });
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
  function handleFavClick() {
    setIsFav(isFav => !isFav)
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
              favs={favs} 
            />
          </Route>
          <Route path="/favorites">
            <Favorites
              key='myFav'
              onRemoveFromFav={onRemoveFromFav}
              currentUser={currentUser}
              favs={favs}
              setFavs={setFavs}
              />
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default App;
