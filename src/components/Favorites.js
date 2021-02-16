import React, { useEffect, useState } from "react";
import FavItem from "./FavItem";

function Favorites({ setFavSt, favAPI, favoritesState }) {

    useEffect(() => {
        fetch(favAPI)
            .then(r => r.json())
            .then(favArray => {
                getBakersObj(favArray)
            })
    }, []);

    function getBakersObj(favArray) {
        const bakersArray = favArray.map((fav) => fav.baker);
        setFavSt(bakersArray);
    };

    return (
        <div>
            {favoritesState.map((favBaker) => <FavItem favBakerObj={favBaker} />)}
        </div>
    )
    // key={favBaker.name}
};

export default Favorites;