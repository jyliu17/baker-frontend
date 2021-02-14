import React, { useState } from "react";
import Baker from "./Baker"
import Search from "./Search"
import NewBakerForm from "./NewBakerForm"

function BakersList({ bakersState, bakerSearch, setBakerSearch, handleAddBaker, showForm, handleFormClick }) {


  const bakersDisplay = bakersState.map((baker => {
    return <Baker key={baker.id} baker={baker} />
  }))
  return (
    <>   
    <Search bakerSearch={bakerSearch} setBakerSearch={setBakerSearch}/>
    <br></br>
    <div className="sidebar">
    <button onClick={handleFormClick}>New Baker form</button>
    {showForm ? <NewBakerForm handleAddBaker={handleAddBaker}/> : null }
    </div>
      <h1>Our Talent Bakers</h1>
   
      {bakersDisplay}
    </>
  )

}

export default BakersList;