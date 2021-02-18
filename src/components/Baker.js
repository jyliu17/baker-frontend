import React, { useState } from "react";
import { Link } from "react-router-dom";


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
        <div>
            <br></br>
            <h3>{name}</h3>
            <img src={profile_image} alt={name} />
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
        </div>
    )
}


export default Baker