import React, { useState } from "react";
import Baker from "./Baker"
import Search from "./Search"
import NewBakerForm from "./NewBakerForm"
import styled from "styled-components"

function BakersList({ setShowForm, bakersState, bakerSearch, setBakerSearch, handleAddBaker, showForm, handleFormClick, onAdded, onRemoved, currentUser, favs }) {

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
    {showForm ? <NewBakerForm setShowForm={setShowForm} handleAddBaker={handleAddBaker}/> : null }
    </div>
    <Wrapper>
      <Title>Our Talented Bakers</Title>
      
      {bakersDisplay}
      </Wrapper>
    </>
  )

}

export default BakersList;

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  flex-direction: column
`
const Title = styled.h1`
  color: skyblue
`

