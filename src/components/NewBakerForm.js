import React, { useEffect, useState } from "react";

function NewBakerForm({handleAddBaker}){

    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [contact, setContact] = useState("");
    const [image, setImage] = useState("");
    const [expertise, setExpertise] = useState("");

    const newBaker = {name: name, 
                      location: location, 
                      contact: contact,
                      profile_image: image,
                      expertise: expertise,
                     }

    function handleSubmit(event){
        event.preventDefault()
    fetch('http://localhost:3000/bakers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBaker),
    })
      .then(response => response.json())
      .then(newBakerData => {
        handleAddBaker(newBakerData);
      })
    }

return(
    <div className="new-baker-form">
    <h2> Add New Baker</h2>
    <form onSubmit={handleSubmit}>
      <input type="text"
        name="name"
        placeholder="Baker name"
        value={name}
        onChange={e => setName(e.target.value)} />
      <input type="text"
        name="location"
        placeholder="Baker location"
        value={location}
        onChange={e => setLocation(e.target.value)} />
      <input type="text"
        name="contact"
        placeholder="Baker Contact"
        value={contact}
        onChange={e => setContact(e.target.value)} />
        <input type="text"
        name="profile image"
        placeholder="Baker Image"
        value={image}
        onChange={e => setImage(e.target.value)} />
        <input type="text"
        name="expertise"
        placeholder="Baker Expertise"
        value={expertise}
        onChange={e => setExpertise(e.target.value)} />
        
      <button type="submit">Add Baker</button>
    </form>
  </div>
);
}

export default NewBakerForm