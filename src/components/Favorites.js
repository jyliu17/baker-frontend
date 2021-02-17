import React, { useEffect, useState } from "react";
import FavItem from "./FavItem";

function Favorites({ setFavoriteBakersState, favoriteBakersState, onRemoveFromFav, currentUser, favs }) {

    // useEffect(() => {
    //     if (currentUser) {
    //     fetch("http://localhost:3000/favorites")
    //         .then(r => r.json())
    //         .then(favArray => {
    //             getBakersObj(favArray)
    //         })
    //     }
    // }, []);

    // function getBakersObj(favArray) {
    //     const userFavArray = favArray.filter(fav => fav.user_id === currentUser.id);
    //     const bakersArray = userFavArray.map((fav) => fav.baker);
    //     setFavoriteBakersState(bakersArray);
    // };
    const bakersArray = favs.map((fav) => fav.baker);
    console.log(favs)
    // setFavoriteBakersState(bakersArray);

    return (
        <div>
            {favoriteBakersState.map((favBaker) => (
    
                <FavItem key='baker'
                    favBakerObj={favBaker}
                    onRemoveFromFav={onRemoveFromFav}
                />
            ))}
        </div>
    )
    // key={favBaker.name}
};

export default Favorites;