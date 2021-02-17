import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UpdateBakerForm from "./UpdateBakerForm"

function BakerPage({handleUpdateBaker, currentUser}) {

  const {id} = useParams();

  const [bakerObj, setBakerObj] = useState({});
  const [pastries, setPastries] = useState([])
  const [showForm, setShowForm] = useState(false)

 
  
  // console.log(id);

  useEffect(() => {
    fetch(`http://localhost:3000/bakers/${id}`)
      .then((r) => r.json())
      .then((obj) => {setBakerObj(obj)
        setPastries(obj.pastries)
      }
      ); 
  }, [id]);

  // console.log(pastries);
  function handleCurrentBaker(newBaker){
    setBakerObj(newBaker)
    handleUpdateBaker(newBaker)

  }

  function handleFormClick(){
    setShowForm(showForm => !showForm)
  }
 

// console.log(bakerObj.pastries);

const { name, location, contact, profile_image, expertise } = bakerObj;

  return (
    <section>
      <div>
        <h3>{name}</h3>
        <img src={profile_image} alt={name} />
        <p> Expertise: {expertise}</p>
        <p> Location: {location}</p>
        <a> Contact: {contact}</a>
        <div>
        {currentUser ?
        <div> 
        {showForm ? <button onClick={handleFormClick}>Hide Form</button> : 
                    <button onClick={handleFormClick}>Update Info</button> }
        {showForm ? <UpdateBakerForm setShowForm={setShowForm} handleCurrentBaker={handleCurrentBaker} bakerObj={bakerObj} /> : null }
        </div> : null }
  
          {pastries.map((p) => (
            <div key={p.id}>
              <h3>{p.name}</h3>
              <img src={p.image} alt={p.name} />
              <p>{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BakerPage;