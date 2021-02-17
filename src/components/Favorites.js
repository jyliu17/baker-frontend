import React, { useEffect, useState } from "react";
import FavItem from "./FavItem";

function Favorites({ favoriteBakersState, onRemoveFromFav, currentUser, favs, setFavs }) {

    useEffect(() => {
        if (currentUser) {
        fetch(`http://localhost:3000/users/${currentUser.id}`)
            .then(r => r.json())
            .then(userObj=> {
                setFavs(userObj.favorites)
                // getBakers(userObj.favorites)
            })
        }
    }, []);

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