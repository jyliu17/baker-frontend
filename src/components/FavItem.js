import React, { useState } from "react";

function FavItem( { favBakerObj, onRemoveFromFav, favId } ){  
    const {name, profile_image} = favBakerObj
    // console.log(favId)
    function handleRemove() {
        onRemoveFromFav(favId)
    }

    return(
        <div>
            <h3>{name}</h3>
            <img src={profile_image} alt={name} />
            <br></br>
            <button onClick={handleRemove}>Remove Favorite</button>
        </div>
    )
}


export default FavItem;