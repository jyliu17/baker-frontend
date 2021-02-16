import React, { useState } from "react";

function FavItem( { favBakerObj, onRemoveFromFav } ){  
    const {name, profile_image} = favBakerObj
    // console.log(favId)

    return(
        <div>
            <h3>{name}</h3>
            <img src={profile_image} alt={name} />
            <br></br>
            <button onClick={onRemoveFromFav}>Remove Favorite</button>
        </div>
    )
}


export default FavItem;