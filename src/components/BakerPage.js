import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UpdateBakerForm from "./UpdateBakerForm"

function BakerPage({handleUpdateBaker}) {

  const {id} = useParams();

  const [bakerObj, setBakerObj] = useState({});
  const [pastries, setPastries] = useState([])
  
   // const [isLoaded, setIsLoaded] = useState(false);
  
  console.log(id);

  useEffect(() => {
    fetch(`http://localhost:3000/bakers/${id}`)
      .then((r) => r.json())
      .then((obj) => {setBakerObj(obj)
        setPastries(obj.pastries)
      }
      ); 
  }, [id]);

  console.log(pastries);


 
  // if (!isLoaded) return <h2>Loading...</h2>;


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
        <div>
          <button>Update Info</button>
          <UpdateBakerForm handleUpdateBaker={handleUpdateBaker}/>
        </div>
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