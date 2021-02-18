import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components"


function Baker({ baker, onAdded, onRemoved, currentUser, favs }) {
    const { id, name, location, contact, profile_image, expertise } = baker;
    
    // console.log(favs);

    function handleClick(e){
        if (e.target.innerText === "Remove Favorite"){
            onRemoved(baker)
        } else {
            onAdded(baker)
        }  
    }

    return (
        <Card>
            <h3>{name}</h3>
            <BakerImage src={profile_image} alt={name} />
            <br></br>
            <Link to={`/bakers/${id}`}>View Sample Pastries </Link>
            <br></br>
            <p> Expertise: {expertise}</p>
            <p> Location: {location}</p>
            <a> Contact: {contact}</a>
            <br></br>
            {currentUser ?
                <button onClick={handleClick}>{favs.find(f=>f.baker.id === id) ? "Remove Favorite" : "Add to My Favorites"}</button>
                : null
            }
        </Card>
    )
}


export default Baker

const Card = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 200px;
  height: 100px
  margin: 10px
  padding: 5px;
  border: none;
  :hover {
      transform: scale(1.04);
      box-shadow: 2px 5px white;
  }
`

const BakerImage = styled.img`
height: 150px
width: 100px;
object-fit: contain;

`