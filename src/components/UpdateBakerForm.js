import React, {  useState } from "react";
import { useParams } from "react-router-dom";

function UpdateBakerForm({handleUpdateBaker}) {


    const {id} = useParams();
    // const [updateName, setUpdateName] = useState("");
    const [updateLocation, setUpdateLocation] = useState("");
    const [updateContact, setUpdateContact] = useState("");
    const [updateImage, setUpdateImage] = useState("");
    const [updateExpertise, setUpdateExpertise] = useState("");
    
    
    const updateBaker = { 
        location: updateLocation, 
        contact: updateContact,
        profile_image: updateImage,
        expertise: updateExpertise,
       }

    function handleSubmit(event){
        event.preventDefault()
        fetch(`http://localhost:3000/bakers/${id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateBaker),
          })
            .then(response => response.json())
            .then(updateData => {
            handleUpdateBaker(updateData);
            })
    }


return (
<div className="new-baker-form">
    <h2> Update Information</h2>
    <form onSubmit={handleSubmit}>
      <input type="text"
        name="location"
        placeholder="Baker location"
        value={updateLocation}
        onChange={e => setUpdateLocation(e.target.value)} />
      <input type="text"
        name="contact"
        placeholder="Baker Contact"
        value={updateContact}
        onChange={e => setUpdateContact(e.target.value)} />
        <input type="text"
        name="profile image"
        placeholder="Baker Image"
        value={updateImage}
        onChange={e => setUpdateImage(e.target.value)} />
        <input type="text"
        name="expertise"
        placeholder="Baker Expertise"
        value={updateExpertise}
        onChange={e => setUpdateExpertise(e.target.value)} />
        
      <button type="submit">Update Baker</button>
    </form>
  </div>
)
}

export default UpdateBakerForm