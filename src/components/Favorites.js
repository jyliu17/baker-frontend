import React, { useEffect, useState } from "react";
import FavItem from "./FavItem";

function Favorites({ favAPI, setFavoriteBakersState, favoriteBakersState, onRemoveFromFav, currentUser }) {

    const [favIds, setFavIds] = useState([]);
    useEffect(() => {
        fetch(favAPI)
            .then(r => r.json())
            .then(favArray => {
                setFavIds([...favIds, favArray.map(f => f.id)])
                getBakersObj(favArray)
            })
    }, []);
    // console.log(currentUser.favorites)
    console.log(favIds);

    function getBakersObj(favArray) {
        if (currentUser) {
            const userFavArray = favArray.filter(fav => fav.baker_id === currentUser.id);
            const bakersArray = userFavArray.map((fav) => fav.baker);
            setFavoriteBakersState(bakersArray);
        }
    };

    const favoritesArray = favoriteBakersState.map((favBaker) => {
        // console.log(favBaker)
        return <FavItem favBakerObj={favBaker} key='baker'/>
     
    })

    return (
        <div>
            {/* {favoriteBakersState.map((favBaker) => (
    
                <FavItem key='baker'
                    favBakerObj={favBaker}
                    onRemoveFromFav={onRemoveFromFav}
                />
            ))} */}
            {favoritesArray}
        </div>
    )
    // key={favBaker.name}
};

export default Favorites;