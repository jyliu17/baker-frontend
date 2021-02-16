import React, { useState } from "react";

function FavItem( { favBakerObj, onRemoved } ){  
    const {name, profile_image} = favBakerObj
    // console.log(favBakerObj)

    return(
        <div>
            <h3>{name}</h3>
            <img src={profile_image} alt={name} />
            <br></br>
            <button onClick={onRemoved}>Remove Favorite</button>
        </div>
    )
}


export default FavItem;