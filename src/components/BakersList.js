import React, { useState } from "react";
import Baker from "./Baker"
import Search from "./Search"
import NewBakerForm from "./NewBakerForm"

function BakersList({ bakersState, bakerSearch, setBakerSearch, handleAddBaker, showForm, handleFormClick, onAdded, onRemoved, currentUser, favs }) {

  const bakersDisplay = bakersState.map((baker) => {
    return <Baker key={baker.id} baker={baker} onAdded={onAdded} onRemoved={onRemoved} currentUser={currentUser} favs={favs} />
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