import React, { useState } from "react";
import { Link } from "react-router-dom";


function Baker({ baker, onAdded, onRemoved, currentUser, favs, isFav, setIsFav }) {
    const { id, name, location, contact, profile_image, expertise } = baker;
    
    console.log(favs);

    function isFavorite() {
        if (favs.length < 1) {
            return false
        } else if (favs.length > 1) {
            favs.forEach(f => {
                if (f.baker_id === baker.id) {
                    return true
                } else {
                    return false
                }
            })
        }
    };

    function onAddFavClick() {
        if (isFavorite === true) {
            onRemoved(baker)
        } else {
            onAdded(baker)
        }
    }

    return (
        <div>
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
                <button onClick={onAddFavClick}>{isFav ? "Remove Favorite" : "Add to My Favorites"}</button>
                : null
            }
        </div>
    )
}


export default Baker