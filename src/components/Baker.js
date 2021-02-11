import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import BakerPage from "./BakerPage"

function Baker({ baker, API }) {
    let { id, name, location, contact, profile_image, expertise } = baker;
    function onHandleClick(event) {

        console.log(event.target);
        fetch(`API/${id}`)
            .then(res => res.json())
            .then(bakerObj => displayBakerPage(bakerObj));

        function displayBakerPage(bakerObj) {
            return (
                <>
                    <Switch>
                        <Route path="/baker/"{...bakerObj.id}>
                            <BakerPage key={bakerObj.id} baker={bakerObj} />
                        </Route>
                    </Switch>
                </>
            )
        }

    }


    return (
        <div>
            <h3>{baker.name}</h3>
            <img src={profile_image} alt={name} />
            <br></br>
            <button onClick={onHandleClick}>View Sample Pastries</button>
            <br></br>
            <p> Expertise: {expertise}</p>
            <p> Location: {location}</p>
            <a> Contact: {contact}</a>
        </div>
    )
}


export default Baker