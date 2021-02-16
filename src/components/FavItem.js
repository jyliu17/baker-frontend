import React from "react";

function FavItem( {favBakerObj} ){  
    const {name, profile_image} = favBakerObj
    // console.log(favBakerObj)
    return(
        <div>
            <h3>{name}</h3>
            <img src={profile_image} alt={name} />
        </div>
    )
}


export default FavItem;