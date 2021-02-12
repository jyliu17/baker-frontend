import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function BakerPage() {
  const [baker, setBaker] = useState(null);
  console.log(baker);

  const {id} = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/bakers/${id}`)
      .then((r) => r.json())
      .then((baker) => {
        setBaker(baker);
      });
  }, [id]);

  const { name, location, contact, profile_image, expertise } = baker;
//   , pastries

  return (
    <section>
      <div>
        <h3>{name}</h3>
        <img src={profile_image} alt={name} />
        <p> Expertise: {expertise}</p>
        <p> Location: {location}</p>
        <a> Contact: {contact}</a>
        {/* <div>
          {pastries.map((p) => (
            <ul key={p.id}>
              <li>{p.name}</li>
              <img src={p.image} alt={p.name} />
              <li>{p.description}</li>
            </ul>
          ))}
        </div> */}
      </div>
    </section>
  );
}

export default BakerPage;