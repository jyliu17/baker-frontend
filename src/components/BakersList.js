import React, { useState } from "react";
import Baker from "./Baker"
import Search from "./Search"

function BakersList({ bakersState, bakerSearch, setBakerSearch }) {


  const bakersDisplay = bakersState.map((baker => {
    return <Baker key={baker.id} baker={baker} />
  }))
  return (
    <>   
    <Search bakerSearch={bakerSearch} setBakerSearch={setBakerSearch}/>
      
      <h1>Our Talent Bakers</h1>
   
      {bakersDisplay}
    </>
  )

}

export default BakersList;