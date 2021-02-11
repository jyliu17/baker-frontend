import React from "react";
import Baker from "./Baker"
import { Switch, Route } from "react-router-dom";

function BakersList({ bakersState, API }) {

  const bakersDisplay = bakersState.map((baker => {
    return <Baker key={baker.id} baker={baker} API={API} />
  }))
  return (
    <>
      <h1>Our Talent Bakers</h1>
      {bakersDisplay}
    </>
  )

}

export default BakersList