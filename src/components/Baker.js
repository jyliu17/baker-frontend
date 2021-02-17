import React, { useState } from "react";
import { Link } from "react-router-dom";


function Baker({ baker, onAdded, onRemoved, currentUser, fav, updateFavs }) {
    const { id, name, location, contact, profile_image, expertise} = baker;
    
    function onAddFavClick(){
    
        if(fav){
            onRemoved(baker)
        }else{
            onAdded(baker) 
        }
        //setFav(!fav);
        //updateFavs(baker, !fav);
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
            <button onClick={onAddFavClick}>{fav ? "Remove Favorite" : "Add to My Favorites"}</button>
            : null  
            }
        </div>
    )
}


export default Baker