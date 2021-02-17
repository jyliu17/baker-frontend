import React, { useState } from "react";
import Baker from "./Baker"
import Search from "./Search"
import NewBakerForm from "./NewBakerForm"

function BakersList({ bakersState, bakerSearch, setBakerSearch, handleAddBaker, showForm, handleFormClick, onAdded, onRemoved, currentUser, favs, updateFavs }) {
  
  // updateFavs(baker, updatedValue) {
  //   for (let i = 0; i < favs.length; i++) {
  //     if (favs[i].baker_id === baker.id) {
  //       favs[i].
  //     }
  //   }
  //   setFavs([]);
  // }

  const bakersDisplay = bakersState.map((baker) => {
    let isFavoriteBaker = favs.find(f => f.baker_id === baker.id);
    return <Baker key={baker.id} baker={baker} onAdded={onAdded} onRemoved={onRemoved} currentUser={currentUser} fav={isFavoriteBaker} />
  })

  return (
    <>   
    <Search bakerSearch={bakerSearch} setBakerSearch={setBakerSearch}/>
    <br></br>
    <div className="sidebar">
    {showForm ?<button onClick={handleFormClick}>Hide Form</button> : 
               <button onClick={handleFormClick}>New Baker form</button> }
    {showForm ? <NewBakerForm handleAddBaker={handleAddBaker}/> : null }
    </div>
      <h1>Our Talented Bakers</h1>
   
      {bakersDisplay}
    </>
  )

}

export default BakersList;