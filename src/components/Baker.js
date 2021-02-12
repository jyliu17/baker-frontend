import React from "react";
import { Link } from "react-router-dom";

function Baker({ baker }) {
    const { id, name, location, contact, profile_image, expertise} = baker;
    
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
        </div>
    )
}


export default Baker