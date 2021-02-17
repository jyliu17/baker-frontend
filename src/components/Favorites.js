import React, { useEffect, useState } from "react";
import FavItem from "./FavItem";

function Favorites({ onRemoveFromFav, currentUser, favs, setFavs, }) {



    console.log(favs);


    return (
        <div>
            {favs.map((f) => (
    
                <FavItem key={f.id}
                    favId={f.id}
                    favBakerObj={f.baker}
                    onRemoveFromFav={onRemoveFromFav}
                />
            ))}
        </div>
    )
    // key={favBaker.name}
};

export default Favorites;