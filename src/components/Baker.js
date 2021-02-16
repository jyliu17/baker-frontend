import React, { useState } from "react";
import { Link } from "react-router-dom";


function Baker({ baker, onAdded, onRemoved }) {
    const { id, name, location, contact, profile_image, expertise} = baker;

    const [fav, setFav] = useState(false);
    
    function onAddFavClick(){
        fav ? onRemoved(baker) : onAdded(baker);
        setFav(!fav);
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
            <button onClick={onAddFavClick}>{fav ? "Remove Favorite" : "Add to My Favorites"}</button>
        </div>
    )
}


export default Baker